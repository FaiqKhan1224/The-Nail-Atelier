import nailImage from '../assets/about-banner.png';
import Button from '../components/ui/Button';

export default function Home() {
  return (
    <main className="bg-cream text-charcoal">

      {/* =====================================================
          HERO / LANDING PAGE
      ====================================================== */}
      <section className="relative min-h-screen w-full overflow-hidden">

        {/* YOUR nail.png */}
        <img
          src={nailImage}
          alt="The Nail Atelier luxury nail artistry"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">

          <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">

            <div className="max-w-2xl text-cream">

              <p className="uppercase tracking-[0.45em] text-xs md:text-sm mb-7">
                The Nail Atelier
              </p>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] font-normal">
                Beauty
                <br />
                <span className="italic">crafted</span>
                <br />
                beautifully.
              </h1>

              <p className="mt-8 max-w-lg text-base md:text-lg leading-8 text-cream/90">
                A refined nail and beauty experience where timeless
                elegance meets modern artistry.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">

                <Button to="/book" variant="primary">
                  Book Appointment
                </Button>

                <Button to="/services" variant="outlineLight">
                  Explore Services
                </Button>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream/80 text-center">

          <span className="block text-[10px] uppercase tracking-[0.35em] mb-3">
            Discover
          </span>

          <div className="w-px h-10 bg-cream/70 mx-auto" />

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="py-24 md:py-32 px-6 bg-cream">

        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[0.35em] text-xs text-gold mb-6">
            Welcome to The Nail Atelier
          </p>

          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            More than nails.
            <br />
            <span className="italic">
              An experience.
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-mocha text-base md:text-lg leading-8">
            Step into a space created for beauty, relaxation and
            self-expression. Every detail at The Nail Atelier is
            designed to make you feel cared for, confident and
            effortlessly beautiful.
          </p>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section className="bg-blush py-24 md:py-32 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">

            <div>

              <p className="uppercase tracking-[0.35em] text-xs text-gold mb-5">
                Our Services
              </p>

              <h2 className="font-display text-4xl md:text-6xl">
                Signature
                <br />
                <span className="italic">
                  treatments.
                </span>
              </h2>

            </div>

            <div className="max-w-md">

              <p className="text-mocha leading-7">
                From classic elegance to detailed nail artistry,
                our treatments are created around your individual
                style and comfort.
              </p>

            </div>

          </div>


          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* MANICURE */}
            <div className="bg-cream p-8 md:p-10 border border-beige">

              <span className="text-xs tracking-[0.25em] text-gold">
                01
              </span>

              <div className="mt-16">

                <h3 className="font-display text-3xl">
                  Manicure
                </h3>

                <p className="mt-5 text-mocha leading-7">
                  Refined nail care, beautiful shaping and a polished
                  finish for effortlessly elegant hands.
                </p>

                <div className="mt-8">

                  <Button
                    to="/services"
                    variant="outline"
                  >
                    Discover
                  </Button>

                </div>

              </div>

            </div>


            {/* NAIL ART */}
            <div className="bg-cream p-8 md:p-10 border border-beige">

              <span className="text-xs tracking-[0.25em] text-gold">
                02
              </span>

              <div className="mt-16">

                <h3 className="font-display text-3xl">
                  Nail Art
                </h3>

                <p className="mt-5 text-mocha leading-7">
                  Bespoke designs, delicate details and creative
                  finishes made to express your personal style.
                </p>

                <div className="mt-8">

                  <Button
                    to="/services"
                    variant="outline"
                  >
                    Discover
                  </Button>

                </div>

              </div>

            </div>


            {/* SPA */}
            <div className="bg-cream p-8 md:p-10 border border-beige">

              <span className="text-xs tracking-[0.25em] text-gold">
                03
              </span>

              <div className="mt-16">

                <h3 className="font-display text-3xl">
                  Spa & Wellness
                </h3>

                <p className="mt-5 text-mocha leading-7">
                  Relaxing hand and foot rituals designed to restore,
                  refresh and rejuvenate.
                </p>

                <div className="mt-8">

                  <Button
                    to="/spa-wellness"
                    variant="outline"
                  >
                    Discover
                  </Button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ATELIER EXPERIENCE
      ====================================================== */}
      <section className="py-24 md:py-32 px-6 bg-cream">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* IMAGE */}
            <div className="relative">

              <img
                src={nailImage}
                alt="Luxury nail artistry"
                className="w-full aspect-[4/5] object-cover object-center"
              />

              <div className="absolute -bottom-5 -right-5 bg-charcoal text-cream px-8 py-7">

                <p className="font-display text-3xl italic">
                  Beauty
                </p>

                <p className="text-sm text-cream/70 mt-2">
                  Designed with intention.
                </p>

              </div>

            </div>


            {/* CONTENT */}
            <div>

              <p className="uppercase tracking-[0.35em] text-xs text-gold mb-6">
                The Atelier Difference
              </p>

              <h2 className="font-display text-4xl md:text-6xl leading-tight">
                Thoughtful details.
                <br />
                <span className="italic">
                  Beautiful results.
                </span>
              </h2>

              <p className="mt-7 text-mocha leading-8">
                We believe beauty should feel personal. From the
                moment you arrive to the final detail of your treatment,
                our focus is on creating an experience that feels
                calm, luxurious and uniquely yours.
              </p>


              <div className="mt-10 space-y-7">

                {/* POINT 1 */}
                <div className="flex gap-5">

                  <div className="text-gold text-xl">
                    ✦
                  </div>

                  <div>

                    <h3 className="font-medium">
                      Expert Artistry
                    </h3>

                    <p className="text-sm text-mocha mt-1">
                      Precise techniques and beautiful finishing.
                    </p>

                  </div>

                </div>


                {/* POINT 2 */}
                <div className="flex gap-5">

                  <div className="text-gold text-xl">
                    ✦
                  </div>

                  <div>

                    <h3 className="font-medium">
                      Personalised Care
                    </h3>

                    <p className="text-sm text-mocha mt-1">
                      Treatments selected around your preferences.
                    </p>

                  </div>

                </div>


                {/* POINT 3 */}
                <div className="flex gap-5">

                  <div className="text-gold text-xl">
                    ✦
                  </div>

                  <div>

                    <h3 className="font-medium">
                      Premium Experience
                    </h3>

                    <p className="text-sm text-mocha mt-1">
                      A peaceful environment created for you.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FULL IMAGE BANNER
      ====================================================== */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">

        <img
          src={nailImage}
          alt="The Nail Atelier beauty experience"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-cream">

          <p className="uppercase tracking-[0.4em] text-xs mb-7">
            Your time. Your style. Your moment.
          </p>

          <h2 className="font-display text-5xl md:text-7xl leading-tight">
            Take time
            <br />
            <span className="italic">
              for yourself.
            </span>
          </h2>

          <p className="max-w-xl mx-auto mt-7 text-cream/85 leading-7">
            Slow down, relax and let us take care of the details.
          </p>

          <div className="mt-9">

            <Button
              to="/book"
              variant="outlineLight"
            >
              Reserve Your Appointment
            </Button>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}
      <section className="py-24 md:py-32 px-6 bg-blush">

        <div className="max-w-6xl mx-auto text-center">

          <p className="uppercase tracking-[0.35em] text-xs text-gold mb-6">
            Client Love
          </p>

          <h2 className="font-display text-4xl md:text-6xl">
            Words from our
            <br />
            <span className="italic">
              clients.
            </span>
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

            {/* REVIEW 1 */}
            <div className="bg-cream p-8 md:p-9 text-left">

              <div className="text-gold text-lg tracking-wider">
                ★★★★★
              </div>

              <p className="mt-6 text-mocha leading-7">
                “Beautiful atmosphere, beautiful work and such a
                relaxing experience. I absolutely loved my nails.”
              </p>

              <p className="mt-7 text-sm tracking-wide">
                Sarah
              </p>

            </div>


            {/* REVIEW 2 */}
            <div className="bg-cream p-8 md:p-9 text-left">

              <div className="text-gold text-lg tracking-wider">
                ★★★★★
              </div>

              <p className="mt-6 text-mocha leading-7">
                “The attention to detail was incredible. Everything
                felt elegant and personal from start to finish.”
              </p>

              <p className="mt-7 text-sm tracking-wide">
                Emma
              </p>

            </div>


            {/* REVIEW 3 */}
            <div className="bg-cream p-8 md:p-9 text-left">

              <div className="text-gold text-lg tracking-wider">
                ★★★★★
              </div>

              <p className="mt-6 text-mocha leading-7">
                “A gorgeous salon experience. My nails looked
                exactly how I imagined them.”
              </p>

              <p className="mt-7 text-sm tracking-wide">
                Olivia
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL BOOKING CTA
      ====================================================== */}
      <section className="bg-charcoal text-cream py-28 md:py-36 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <p className="uppercase tracking-[0.4em] text-xs text-gold mb-7">
            The Nail Atelier
          </p>

          <h2 className="font-display text-5xl md:text-7xl leading-tight">
            Your next beautiful
            <br />
            <span className="italic">
              moment starts here.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-7 text-cream/70 leading-8">
            Book your appointment and discover a beauty experience
            created around you.
          </p>

          <div className="mt-10 flex justify-center flex-wrap gap-4">

            <Button
              to="/book"
              variant="primary"
            >
              Book Appointment
            </Button>

            <Button
              to="/contact"
              variant="outlineLight"
            >
              Contact Atelier
            </Button>

          </div>

        </div>

      </section>

    </main>
  );
}
