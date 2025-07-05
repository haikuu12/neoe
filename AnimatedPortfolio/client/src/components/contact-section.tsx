import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// GSAP plugins are loaded via CDN in index.html
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    ScrollToPlugin: any;
  }
}

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!sectionRef.current) return;

    const titleChars = titleRef.current?.querySelectorAll(".split-char");
    const contactItems = sectionRef.current.querySelectorAll(".contact-item");
    const formGroups = sectionRef.current.querySelectorAll(".form-group");

    // Title animation
    if (titleChars) {
      gsap.to(titleChars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });
    }

    // Content animations
    gsap.from(contentRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    gsap.from(formRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    // Stagger contact items
    gsap.from(contactItems, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    // Stagger form groups
    gsap.from(formGroups, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        end: "bottom 20%",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === titleRef.current ||
          trigger.trigger === contentRef.current ||
          trigger.trigger === formRef.current ||
          Array.from(contactItems).includes(trigger.trigger as Element) ||
          Array.from(formGroups).includes(trigger.trigger as Element)
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (contactData: { name: string; email: string; subject: string; message: string }) => {
      return await apiRequest("/api/contacts", "POST", contactData);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    contactMutation.mutate(contactData);
    
    if (!contactMutation.isError) {
      (e.target as HTMLFormElement).reset();
    }
  };

  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@designer.com",
      bgColor: "accent",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      bgColor: "amber",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      bgColor: "accent",
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-muted/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="section-title text-5xl font-bold mb-4 split-text"
          >
            <span className="split-char">G</span>
            <span className="split-char">e</span>
            <span className="split-char">t</span>
            <span className="split-char"> </span>
            <span className="split-char">I</span>
            <span className="split-char">n</span>
            <span className="split-char"> </span>
            <span className="split-char">T</span>
            <span className="split-char">o</span>
            <span className="split-char">u</span>
            <span className="split-char">c</span>
            <span className="split-char">h</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's collaborate and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div ref={contentRef} className="contact-info">
            <h3 className="text-3xl font-bold mb-8">Let's Start a Conversation</h3>

            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div key={index} className="contact-item flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.bgColor === "accent" ? "bg-accent" : "bg-amber"
                    }`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links flex space-x-4 mt-8">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div ref={formRef} className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-group">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="mt-2"
                />
              </div>

              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="mt-2"
                />
              </div>

              <div className="form-group">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project inquiry"
                  required
                  className="mt-2"
                />
              </div>

              <div className="form-group">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="submit-button w-full bg-accent text-accent-foreground py-4 rounded-lg font-semibold hover:bg-accent/90 transform hover:scale-105 transition-all duration-300"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
