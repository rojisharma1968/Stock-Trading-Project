
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AtSign, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-financial-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    350 Financial Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-financial-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AtSign className="h-5 w-5 mr-3 text-financial-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@equitywatch.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM ET</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 3:00 PM ET</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Response times: We aim to respond to all inquiries within 24 business hours.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Before reaching out, check our frequently asked questions for quick answers:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <span className="font-medium">Is the data real-time?</span>
                  <p className="text-gray-600 ml-6">
                    We provide near real-time data with minimal delay.
                  </p>
                </li>
                <li>
                  <span className="font-medium">What data sources do you use?</span>
                  <p className="text-gray-600 ml-6">
                    We aggregate data from various financial APIs and providers.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
