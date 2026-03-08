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
    <section id="faq" className="py-24 lg:py-32 bg-background relative">
      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
              >
                <AccordionItem value={`faq-${i}`} className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden">
                  <AccordionTrigger className="font-display font-semibold text-foreground text-left hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
