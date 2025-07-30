import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Users, Shield, Brain, UserPlus } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

interface HomePageProps {
  onDoctorRegister: () => void;
  onPatientLogin: () => void;
  onPatientRegister: () => void;
}

export const HomePage = ({ onDoctorRegister, onPatientLogin, onPatientRegister }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-background">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HomoCure</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                HomoCure
                <span className="block text-primary">Your AI-powered</span>
                <span className="block text-medical-blue">Homeopathy Assistant</span>
              </h1>
              
              <p className="text-xl text-muted-foreground font-medium">
                Smart Healing, Simplified.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience the future of homeopathic care with our intelligent platform. 
                Connect doctors and patients through secure, token-based consultations 
                powered by AI-driven remedy suggestions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={onDoctorRegister}
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Register as Doctor
                </Button>
                <Button 
                  onClick={onPatientRegister}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 border-medical-secondary text-medical-secondary hover:bg-medical-secondary/10"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Patient Registration
                </Button>
                <Button 
                  onClick={onPatientLogin}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Patient Login (via Token)
                </Button>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Medical care illustration" 
                className="w-full h-auto rounded-2xl shadow-medical"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose HomoCure?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-soft transition-shadow">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Get intelligent remedy suggestions based on symptoms and patient history.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-soft transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Token-based patient access ensures privacy and security of medical data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-soft transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
                <p className="text-muted-foreground">
                  Streamlined patient records and consultation history in one place.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted px-6 py-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">HomoCure</span>
          </div>
          <p className="text-muted-foreground">
            Empowering homeopathic care through intelligent technology
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <span>Contact: support@homocure.com | Help Center | Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};