import { useRef, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface ContactProps {
  isDark: boolean;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact({ isDark }: ContactProps) {
  /**
   * NOTE (EmailJS default Contact Us template):
   * If your EmailJS template body uses:
   *   {{name}}
   *   {{time}}
   *   {{message}}
   * then this component sends EXACTLY those variables.
   *
   * Also sets Reply-To via {{from_email}} / {{reply_to}} if you use them in template.
   */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot (hidden)
  });

  type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [status, setStatus] = useState<FormStatus>("idle");

  const lastSentAtRef = useRef<number>(0);
  const resetTimerRef = useRef<number | null>(null);

  const scheduleResetToIdle = () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setStatus("idle"), 5000);
  };

  // Returns an error string if invalid, otherwise null
  const validate = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your full name (min. 2 characters).";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter a valid email address.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    if (touched[name]) {
      const validationErrors = validate();

      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const validationErrors = validate();

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof FormErrors],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // If already sending, ignore.
    if (status === "loading") return;

    // Honeypot: if filled, likely bot.
    if (formData.company.trim().length > 0) return;

    // Rate limit: block rapid submits (< 4s).
    const now = Date.now();
    if (now - lastSentAtRef.current < 4000) return;
    lastSentAtRef.current = now;

    const validationErrors = validate();

    setTouched({
      name: true,
      email: true,
      message: true,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");

    try {
      const senderName = formData.name.trim();
      const senderEmail = formData.email.trim();
      const userMessage = formData.message.trim();

      // IMPORTANT: these keys MUST match your EmailJS template variables
      // Default "Contact Us" templates often use: {{name}} {{time}} {{message}}
      const templateParams: Record<string, string> = {
        // Matches {{name}} in default template
        name: senderName,

        // Matches {{time}} in default template
        time: new Date().toLocaleString(),

        // Matches {{message}} in default template
        // Put email inside message so you always see it even if template is minimal
        message: `Email: ${senderEmail}\n\n${userMessage}`,

        // Extra (safe): use these if your template settings/fields reference them
        from_name: senderName,
        from_email: senderEmail,
        reply_to: senderEmail,

        // Only needed if your template "To Email" is set to {{to_email}}
        to_email: "dhruvintejani21@gmail.com",
      };

      // Debug (safe): helps confirm env/ids are loaded
      if (
        !emailjsConfig.serviceId ||
        !emailjsConfig.templateId ||
        !emailjsConfig.publicKey
      ) {
        throw new Error(
          "EmailJS config missing. Check VITE_EMAILJS_* values in .env and restart dev server.",
        );
      }

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "", company: "" });
      setErrors({});
      setTouched({});
      scheduleResetToIdle();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      scheduleResetToIdle();
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 outline-none ${
    isDark
      ? "bg-white/[0.05] border border-white/[0.08] text-white placeholder-surface-500 focus:border-primary-500/50 focus:bg-white/[0.08]"
      : "bg-surface-50 border border-surface-200 text-surface-900 placeholder-surface-400 focus:border-primary-400 focus:bg-white"
  }`;

  return (
    <section id="contact" className="py-24 lg:py-32 relative">
      <Container>
        <SectionHeading
          title="Let's Connect"
          subtitle="Let's build something amazing together"
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-surface-900"
                }`}
              >
                Let&apos;s build something{" "}
                <span className="text-gradient">amazing.</span>
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-surface-400" : "text-surface-600"
                }`}
              >
                Have a project in mind? I&apos;d love to hear about it. Send me
                a message and let&apos;s discuss how I can help bring your ideas
                to life.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "dhruvintejani.work@gmail.com",
                  href: "mailto:dhruvintejani.work@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Available Worldwide (Remote)",
                  href: undefined,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark
                        ? "bg-primary-500/10 text-primary-400"
                        : "bg-primary-50 text-primary-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p
                      className={`text-xs ${
                        isDark ? "text-surface-500" : "text-surface-400"
                      }`}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className={`text-sm font-medium hover:text-primary-400 transition-colors ${
                          isDark ? "text-white" : "text-surface-900"
                        }`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className={`text-sm font-medium ${
                          isDark ? "text-white" : "text-surface-900"
                        }`}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`rounded-2xl p-8 ${
                isDark
                  ? "bg-white/[0.03] border border-white/[0.06]"
                  : "bg-white border border-surface-200 shadow-sm"
              }`}
            >
              {/* Honeypot (hidden) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? "text-surface-400" : "text-surface-600"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    className={inputClasses}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    className={`block text-xs font-medium mb-2 ${
                      isDark ? "text-surface-400" : "text-surface-600"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  className={`block text-xs font-medium mb-2 ${
                    isDark ? "text-surface-400" : "text-surface-600"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses} resize-none`}
                />
                {touched.message && errors.message && (
                  <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === "loading"}
                className="w-full"
                icon={
                  status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )
                }
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  className="mt-4 flex items-center gap-2 text-emerald-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="mt-4 flex items-center gap-2 text-red-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Failed to send. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
