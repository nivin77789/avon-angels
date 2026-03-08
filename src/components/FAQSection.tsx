import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What areas do you cover?", a: "We provide home care services across all of Avon, including Bath, Bristol, Keynsham, Clevedon, Portishead, Weston-super-Mare, and surrounding areas. If you're unsure whether we cover your area, please give us a call." },
  { q: "How quickly can care start?", a: "In urgent cases, we can begin care within 24-48 hours. Typically, we aim to start within one week of the initial assessment to ensure we match you with the right carer and create a thorough care plan." },
  { q: "Are your carers qualified?", a: "Yes, all our carers hold a minimum NVQ Level 2 in Health & Social Care. They undergo enhanced DBS checks, comprehensive training, and receive ongoing professional development. Many have specialist certifications in dementia care, complex care, and end-of-life care." },
  { q: "Can I choose my carer?", a: "Absolutely. We carefully match carers based on personality, interests, and care needs. You'll meet your proposed carer before care begins, and we'll always accommodate changes if the match isn't quite right." },
  { q: "What if I need to cancel or change visits?", a: "We understand that needs change. You can adjust your care schedule with just 48 hours' notice at no extra cost. We don't tie you into long-term contracts — you're always in control." },
  { q: "Do you provide care for complex medical conditions?", a: "Yes, we provide specialist care for conditions including dementia, Parkinson's, multiple sclerosis, stroke recovery, and more. Our complex care team includes carers with advanced clinical training." },
  { q: "How much does home care cost?", a: "Costs depend on the type and frequency of care needed. Visiting care starts from £20/hour. We provide a detailed quote after your free assessment with no hidden fees. We can also advise on funding options including local authority support." },
  { q: "Is Avon Angels regulated?", a: "Yes, we are fully registered and regulated by the Care Quality Commission (CQC). Our latest inspection report is available on the CQC website. We maintain the highest standards of care quality and safety." },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full blur-[100px]" style={{ background: "hsl(160 84% 39% / 0.04)" }} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            FAQ
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Frequently Asked
            <br /><span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 0.08 * i, type: "spring", stiffness: 80 }}
              >
                <motion.div whileHover={{ scale: 1.01, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <AccordionItem value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 hover:border-primary/20 px-6 overflow-hidden transition-colors duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <AccordionTrigger className="font-display font-semibold text-foreground text-left hover:no-underline hover:text-primary py-5 transition-colors duration-300">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
