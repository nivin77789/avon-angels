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
    <section className="py-28 bg-card relative overflow-hidden">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Our Home</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            A Place You'll Love
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
              style={{ boxShadow: "var(--shadow-soft)", perspective: "800px" }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-80 object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <motion.span
                  className="font-display font-semibold text-primary-foreground p-6 text-lg"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                >
                  {img.label}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
