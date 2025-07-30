import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, LogOut, Plus, Search, Brain, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  symptoms: string;
  prescription: string;
  duration: number;
  token: string;
  createdAt: Date;
  daysLeft: number;
}

interface DoctorDashboardProps {
  doctor: Doctor;
  onLogout: () => void;
}

export const DoctorDashboard = ({ doctor, onLogout }: DoctorDashboardProps) => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "Alice Johnson",
      age: 35,
      symptoms: "Headache, fatigue, stress",
      prescription: "Belladonna 30C, Arnica Montana 200C",
      duration: 14,
      token: "PAT001",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      daysLeft: 9
    },
    {
      id: "2", 
      name: "Bob Smith",
      age: 42,
      symptoms: "Digestive issues, bloating",
      prescription: "Nux Vomica 30C, Carbo Vegetabilis 200C",
      duration: 21,
      token: "PAT002",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      daysLeft: 18
    }
  ]);
  
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    symptoms: "",
    prescription: "",
    duration: ""
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSymptoms, setAiSymptoms] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const { toast } = useToast();

  const generateToken = () => {
    return "PAT" + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPatient.name || !newPatient.age || !newPatient.symptoms || !newPatient.prescription || !newPatient.duration) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      symptoms: newPatient.symptoms,
      prescription: newPatient.prescription,
      duration: parseInt(newPatient.duration),
      token: generateToken(),
      createdAt: new Date(),
      daysLeft: parseInt(newPatient.duration)
    };

    setPatients([...patients, patient]);
    setNewPatient({ name: "", age: "", symptoms: "", prescription: "", duration: "" });
    
    toast({
      title: "Patient Added Successfully",
      description: `Token: ${patient.token}`,
    });
  };

  const handleAiSuggestion = () => {
    if (!aiSymptoms.trim()) {
      toast({
        title: "Error",
        description: "Please enter symptoms first.",
        variant: "destructive",
      });
      return;
    }

    // Mock AI logic - replace with actual AI integration
    const mockSuggestions = [
      "Arnica Montana 30C - for trauma and bruising",
      "Belladonna 30C - for sudden onset fever and inflammation", 
      "Nux Vomica 30C - for digestive issues and stress",
      "Pulsatilla 30C - for emotional sensitivity and changeable symptoms",
      "Rhus Toxicodendron 30C - for joint stiffness and restlessness"
    ];
    
    const randomSuggestion = mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)];
    setAiSuggestion(`Based on symptoms "${aiSymptoms}", I suggest: ${randomSuggestion}. Please consult your clinical experience and patient history before prescribing.`);
    
    toast({
      title: "AI Suggestion Generated",
      description: "Review the suggestion below.",
    });
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.token.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-blue to-background">
      {/* Header */}
      <header className="px-6 py-4 bg-card border-b">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HomoCure</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
            </div>
            <Button variant="outline" onClick={onLogout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

          <Tabs defaultValue="patients" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patients">Patient Records</TabsTrigger>
              <TabsTrigger value="add">Add Patient</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>

            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Patient History</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or token..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredPatients.map((patient) => (
                      <Card key={patient.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{patient.name}</h3>
                              <p className="text-muted-foreground">Age: {patient.age}</p>
                              <p className="text-sm text-muted-foreground">Token: {patient.token}</p>
                              <Badge variant={patient.daysLeft > 0 ? "default" : "secondary"} className="mt-2">
                                {patient.daysLeft > 0 ? `${patient.daysLeft} days left` : "Course Completed"}
                              </Badge>
                            </div>
                            <div>
                              <p className="text-sm"><strong>Symptoms:</strong> {patient.symptoms}</p>
                              <p className="text-sm mt-1"><strong>Prescription:</strong> {patient.prescription}</p>
                              <p className="text-sm mt-1 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {patient.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add New Patient Record</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddPatient} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                          id="patientName"
                          placeholder="Enter patient name"
                          value={newPatient.name}
                          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientAge">Age</Label>
                        <Input
                          id="patientAge"
                          type="number"
                          placeholder="Enter age"
                          value={newPatient.age}
                          onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptoms">Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe patient symptoms..."
                        value={newPatient.symptoms}
                        onChange={(e) => setNewPatient({ ...newPatient, symptoms: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prescription">Prescription</Label>
                      <Textarea
                        id="prescription"
                        placeholder="Enter prescribed remedies..."
                        value={newPatient.prescription}
                        onChange={(e) => setNewPatient({ ...newPatient, prescription: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="Treatment duration in days"
                        value={newPatient.duration}
                        onChange={(e) => setNewPatient({ ...newPatient, duration: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Add Patient & Generate Token
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>AI Remedy Suggestions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aiSymptoms">Enter Symptoms</Label>
                    <Textarea
                      id="aiSymptoms"
                      placeholder="Describe the symptoms for AI analysis..."
                      value={aiSymptoms}
                      onChange={(e) => setAiSymptoms(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleAiSuggestion} className="w-full">
                    Get AI Suggestion
                  </Button>

                  {aiSuggestion && (
                    <Card className="bg-accent">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">AI Suggestion:</h4>
                        <p className="text-sm">{aiSuggestion}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          * This is a mock AI suggestion. Always use clinical judgment.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};