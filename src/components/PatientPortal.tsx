import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, ArrowLeft, Calendar, Pill, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientData {
  name: string;
  age: number;
  token: string;
  consultations: {
    id: string;
    date: Date;
    symptoms: string;
    prescription: string;
    duration: number;
    daysLeft: number;
  }[];
}

interface PatientPortalProps {
  onBack: () => void;
}

export const PatientPortal = ({ onBack }: PatientPortalProps) => {
  const [token, setToken] = useState("");
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock patient data
  const mockPatients: Record<string, PatientData> = {
    "PAT001": {
      name: "Alice Johnson",
      age: 35,
      token: "PAT001",
      consultations: [
        {
          id: "1",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          symptoms: "Headache, fatigue, stress",
          prescription: "Belladonna 30C (3 times daily), Arnica Montana 200C (twice daily)",
          duration: 14,
          daysLeft: 9
        },
        {
          id: "2", 
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          symptoms: "Anxiety, insomnia",
          prescription: "Ignatia 30C (twice daily), Coffea Cruda 200C (before bed)",
          duration: 21,
          daysLeft: 0
        }
      ]
    },
    "PAT002": {
      name: "Bob Smith",
      age: 42,
      token: "PAT002",
      consultations: [
        {
          id: "1",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          symptoms: "Digestive issues, bloating",
          prescription: "Nux Vomica 30C (before meals), Carbo Vegetabilis 200C (after meals)",
          duration: 21,
          daysLeft: 18
        }
      ]
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundPatient = mockPatients[token.toUpperCase()];
      
      if (foundPatient) {
        setPatient(foundPatient);
        toast({
          title: "Access Granted",
          description: `Welcome, ${foundPatient.name}!`,
        });
      } else {
        toast({
          title: "Invalid Token",
          description: "Please check your token and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft === 0) return "secondary";
    if (daysLeft <= 3) return "destructive";
    if (daysLeft <= 7) return "default";
    return "default";
  };

  const getStatusText = (daysLeft: number) => {
    if (daysLeft === 0) return "Course Completed";
    if (daysLeft === 1) return "1 day left";
    return `${daysLeft} days left`;
  };

  if (!patient) {
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
                <CardTitle className="text-2xl">Patient Portal</CardTitle>
                <p className="text-muted-foreground">Enter your token to access your medical records</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTokenSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="token">Patient Token</Label>
                    <Input
                      id="token"
                      type="text"
                      placeholder="Enter your token (e.g., PAT001)"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Access Records"}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-accent rounded-lg">
                  <h4 className="font-semibold mb-2">Demo Tokens:</h4>
                  <p className="text-sm text-muted-foreground">Try: PAT001 or PAT002</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-background">
      <header className="px-6 py-4 bg-card border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HomoCure</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{patient.name}</p>
              <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
            </div>
            <Button variant="outline" onClick={() => setPatient(null)} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Your Medical Records</h1>

          <div className="space-y-6">
            {patient.consultations.map((consultation) => (
              <Card key={consultation.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Consultation - {consultation.date.toLocaleDateString()}</span>
                    </CardTitle>
                    <Badge variant={getStatusColor(consultation.daysLeft)}>
                      <Clock className="h-3 w-3 mr-1" />
                      {getStatusText(consultation.daysLeft)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Symptoms Reported:</h4>
                    <p className="text-muted-foreground">{consultation.symptoms}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Pill className="h-4 w-4 mr-2" />
                      Prescribed Medicine:
                    </h4>
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-sm">{consultation.prescription}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Treatment Duration:</span>
                      <Badge variant="outline">{consultation.duration} days</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant={getStatusColor(consultation.daysLeft)}>
                        {getStatusText(consultation.daysLeft)}
                      </Badge>
                    </div>
                  </div>

                  {consultation.daysLeft > 0 && (
                    <div className="bg-medical-light-blue p-3 rounded-lg border-l-4 border-primary">
                      <p className="text-sm text-primary">
                        <strong>Reminder:</strong> Continue taking your prescribed medicines as directed. 
                        {consultation.daysLeft <= 3 && " Your course is almost complete!"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {patient.consultations.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No consultation records found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};