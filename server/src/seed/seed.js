require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Service = require('../models/Service');
const GalleryItem = require('../models/GalleryItem');
const Offer = require('../models/Offer');
const Package = require('../models/Package');
const Review = require('../models/Review');
const BusinessSettings = require('../models/BusinessSettings');
const AIKnowledge = require('../models/AIKnowledge');

const img = (seed) => `https://picsum.photos/seed/${seed}/900/700`;

async function seed() {
  await connectDB();
  console.log('Seeding database...');

  await Promise.all([
    Service.deleteMany({}),
    GalleryItem.deleteMany({}),
    Offer.deleteMany({}),
    Package.deleteMany({}),
    Review.deleteMany({}),
    AIKnowledge.deleteMany({}),
  ]);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nailatelier.test';
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: 'Studio Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    });
    console.log(`Admin account created: ${adminEmail} / ${process.env.ADMIN_PASSWORD || 'ChangeMe123!'}`);
  }

  let customer = await User.findOne({ email: 'sarah@example.com' });
  if (!customer) {
    customer = await User.create({ name: 'Sarah M.', email: 'sarah@example.com', password: 'password123' });
  }

  await Service.insertMany([
    {
      name: 'Signature Manicure',
      category: 'Nail Treatments',
      description: 'Our classic manicure with shape, cuticle care, and polish of your choice.',
      price: 45,
      duration: 45,
      image: img('svc1'),
      benefits: ['Nourished cuticles', 'Long-lasting polish'],
      aftercare: ['Avoid water for 1 hour', 'Apply cuticle oil daily'],
      featured: true,
      published: true,
    },
    {
      name: 'Luxury Pedicure',
      category: 'Spa Treatments',
      description: 'A relaxing foot soak, exfoliation, and massage finished with polish.',
      price: 60,
      duration: 60,
      image: img('svc2'),
      benefits: ['Deep exfoliation', 'Relaxing massage'],
      aftercare: ['Wear open shoes for 2 hours'],
      featured: true,
      published: true,
    },
    {
      name: 'Gel Manicure',
      category: 'Nail Treatments',
      description: 'Chip-resistant gel polish that stays glossy for weeks.',
      price: 55,
      duration: 60,
      image: img('svc3'),
      addOns: [
        { name: 'Nail Art', price: 15 },
        { name: 'French Tip', price: 10 },
      ],
      benefits: ['Lasts 2–3 weeks', 'High-shine finish'],
      aftercare: ['Avoid harsh chemicals', 'Wear gloves for cleaning'],
      featured: true,
      published: true,
    },
    {
      name: 'Acrylic Extensions',
      category: 'Nail Treatments',
      description: 'Full-set acrylic extensions sculpted to your desired length and shape.',
      price: 70,
      duration: 90,
      image: img('svc4'),
      benefits: ['Custom length & shape', 'Durable wear'],
      aftercare: ['Refill every 2–3 weeks'],
      featured: true,
      published: true,
    },
    {
      name: 'Nail Art',
      category: 'Nail Treatments',
      description: 'Hand-painted nail art added to any manicure or gel service.',
      price: 15,
      duration: 30,
      image: img('svc5'),
      published: true,
    },
    {
      name: 'Nail Removal',
      category: 'Nail Treatments',
      description: 'Safe, gentle removal of gel or acrylic without damaging the natural nail.',
      price: 15,
      duration: 20,
      image: img('svc6'),
      published: true,
    },
    {
      name: 'Hand Spa Ritual',
      category: 'Spa Treatments',
      description: 'A warm soak, scrub, and massage to soften and restore tired hands.',
      price: 40,
      duration: 40,
      image: img('svc7'),
      published: true,
    },
    {
      name: 'Foot Spa Ritual',
      category: 'Spa Treatments',
      description: 'A restorative foot treatment with exfoliation and hydration.',
      price: 45,
      duration: 45,
      image: img('svc8'),
      published: true,
    },
    {
      name: 'Relaxation Massage',
      category: 'Spa Treatments',
      description: 'A calming hand and shoulder massage using warm oils.',
      price: 35,
      duration: 30,
      image: img('svc9'),
      published: true,
    },
  ]);

  await GalleryItem.insertMany([
    { image: img('gal1'), category: 'French Nails', caption: 'Classic French tips' },
    { image: img('gal2'), category: 'Bridal Nails', caption: 'Bridal elegance' },
    { image: img('gal3'), category: 'Chrome Nails', caption: 'Mirror chrome finish' },
    { image: img('gal4'), category: 'Minimalist Nails', caption: 'Understated minimalism' },
    { image: img('gal5'), category: 'Creative Nail Art', caption: 'Hand-painted detail' },
    { image: img('gal6'), category: 'Spa Interior', caption: 'Our studio' },
  ]);

  await Offer.create({
    title: '20% Off Gel Manicure',
    description: 'Enjoy 20% off any gel manicure this month.',
    discountLabel: '20% OFF',
    code: 'GEL20',
    image: img('offer1'),
    startDate: new Date(Date.now() - 7 * 86400000),
    endDate: new Date(Date.now() + 21 * 86400000),
    active: true,
  });

  await Package.insertMany([
    {
      name: 'The Classic Bride',
      price: 199,
      includes: ['Bridal manicure', 'Bridal pedicure', 'Nail art trial'],
      image: img('pkg1'),
      published: true,
    },
    {
      name: 'The Luxe Bride',
      price: 299,
      includes: ['Bridal manicure', 'Bridal pedicure', 'Custom nail art', 'Hand spa ritual'],
      image: img('pkg2'),
      popular: true,
      published: true,
    },
  ]);

  await Review.create({
    customer: customer._id,
    rating: 5,
    comment: 'Absolutely loved my gel manicure — it lasted three weeks!',
    approved: true,
  });

  await AIKnowledge.insertMany([
    {
      question: 'Do you accept walk-ins?',
      answer: 'We recommend booking in advance to guarantee your preferred time, but walk-ins are welcome based on availability.',
      category: 'Booking',
      keywords: ['walk-in', 'walkin', 'appointment'],
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We ask for at least 24 hours notice to cancel or reschedule an appointment.',
      category: 'Cancellation',
      keywords: ['cancel', 'reschedule'],
    },
  ]);

  let settings = await BusinessSettings.findOne();
  if (!settings) settings = new BusinessSettings();
  settings.phone = '+1 (555) 123-4567';
  settings.email = 'hello@nailatelier.test';
  settings.address = '123 Beauty Lane, Suite 100, Los Angeles, CA';
  settings.policies.cancellation = 'Please give at least 24 hours notice to cancel or reschedule.';
  settings.policies.deposit = 'A 20% deposit is required for bridal packages.';
  settings.aiConfig.quickActions = [
    { label: 'Book an Appointment', route: '/booking' },
    { label: 'Explore Nail Services', route: '/services?category=Nail Treatments' },
    { label: 'View Spa Services', route: '/services?category=Spa Treatments' },
    { label: 'Opening Hours', route: '/contact' },
  ];
  await settings.save();

  console.log('Seed complete.');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
