const faqs = [
  {
    question: "What is Fixitronics?",
    answer:
      "Fixitronics is a service-sharing platform where users can list, book, and manage repair or maintenance services easily.",
  },
  {
    question: "Is Fixitronics free to use?",
    answer:
      "Yes, creating an account and exploring services is free. Some premium features may be added in the future.",
  },
  {
    question: "How do I book a service?",
    answer:
      "Simply browse the available services, select the one you need, and confirm your booking through our secure system.",
  },
  {
    question: "Can I become a service provider?",
    answer:
      "Yes! You can register as a provider and start offering your services directly on Fixitronics.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-base-100 ">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-extrabold text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="collapse collapse-plus border border-base-300 dark:border-base-200 rounded-xl bg-base-200 dark:bg-base-300"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-medium text-base-content dark:text-base-100">
                {faq.question}
              </div>
              <div className="collapse-content text-base-content dark:text-base-100">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
