import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DoctorRegisterProps {
  onBack: () => void;
  onLogin: () => void;
  onSuccess: (doctorData: any) => void;
}

export const DoctorRegister = ({ onBack, onLogin, onSuccess }: DoctorRegisterProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login logic
      if (formData.email && formData.password) {
        const mockDoctor = {
          id: "doc_" + Date.now(),
          name: "Dr. " + formData.email.split('@')[0],
          email: formData.email,
          specialization: "Homeopathy"
        };
        onSuccess(mockDoctor);
        toast({
          title: "Login Successful",
          description: "Welcome back, Doctor!",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials.",
          variant: "destructive",
        });
      }
    } else {
      // Mock registration logic
      if (formData.name && formData.email && formData.password && formData.specialization) {
        const newDoctor = {
          id: "doc_" + Date.now(),
          name: formData.name,
          email: formData.email,
          specialization: formData.specialization
        };
        onSuccess(newDoctor);
        toast({
          title: "Registration Successful",
          description: "Welcome to HomoCure!",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-background">
      <header className="px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HomoCure</span>
          </div>
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
      </header>

      <div className="px-6 py-12">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-medical">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isLogin ? "Doctor Login" : "Doctor Registration"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classical">Classical Homeopathy</SelectItem>
                        <SelectItem value="clinical">Clinical Homeopathy</SelectItem>
                        <SelectItem value="complex">Complex Homeopathy</SelectItem>
                        <SelectItem value="pediatric">Pediatric Homeopathy</SelectItem>
                        <SelectItem value="constitutional">Constitutional Homeopathy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {isLogin ? "Login" : "Register"}
                </Button>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Need to register? Sign up here" : "Already have an account? Login here"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};