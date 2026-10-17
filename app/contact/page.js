import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact – SkyNow" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Contact</h1>
      <p className="mt-3 text-sky-deep/80">
        Have a question or feedback? Send us a message.
      </p>
      <ContactForm />
    </section>
  );
}
