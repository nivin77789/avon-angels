import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import roomImg from "@/assets/room.jpg";
import gardenImg from "@/assets/garden.jpg";
import heroImg from "@/assets/hero-care.jpg";

const images = [
  { src: heroImg, alt: "Communal lounge at Avon Angels Care Home", label: "Communal Living" },
  { src: roomImg, alt: "Comfortable bedroom at Avon Angels Care Home", label: "Private Rooms" },
  { src: gardenImg, alt: "Beautiful gardens at Avon Angels Care Home", label: "Our Gardens" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-card">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Our Home</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            A Place You'll Love
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="relative group overflow-hidden rounded-xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end">
                <span className="font-display font-semibold text-primary-foreground p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
