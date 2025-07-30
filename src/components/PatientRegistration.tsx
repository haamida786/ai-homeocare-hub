import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientRegistrationProps {
  onBack: () => void;
}

interface PatientData {
  fullName: string;
  age: string;
  gender: string;
  symptoms: string;
  menstrualCycle?: string;
  menstrualPain?: string;
  pregnancy?: string;
  emotionalSymptoms?: string;
  foodWeatherPreferences?: string;
  fatigue?: string;
  prostateSymptoms?: string;
  stressFactors?: string;
  generalHealth?: string;
  sleepPatterns?: string;
  emotionalHealth?: string;
}

export const PatientRegistration = ({ onBack }: PatientRegistrationProps) => {
  const { toast } = useToast();
  const [patientData, setPatientData] = useState<PatientData>({
    fullName: "",
    age: "",
    gender: "",
    symptoms: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - store temporarily
    console.log("Patient Registration Data:", patientData);
    
    toast({
      title: "Registration Successful",
      description: "Patient registration has been submitted successfully.",
    });

    // Reset form
    setPatientData({
      fullName: "",
      age: "",
      gender: "",
      symptoms: ""
    });
  };

  const updatePatientData = (field: keyof PatientData, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }));
  };

  const renderFemaleQuestions = () => (
    <Card className="border-pink-200 bg-pink-50/50">
      <CardHeader>
        <CardTitle className="text-lg text-pink-800">Female-Specific Health Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">How regular is your menstrual cycle?</Label>
          <RadioGroup 
            value={patientData.menstrualCycle || ""} 
            onValueChange={(value) => updatePatientData('menstrualCycle', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="regular" />
              <Label htmlFor="regular">Regular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="irregular" id="irregular" />
              <Label htmlFor="irregular">Irregular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-applicable" id="not-applicable" />
              <Label htmlFor="not-applicable">Not applicable</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Are you experiencing any pain during menstruation?</Label>
          <RadioGroup 
            value={patientData.menstrualPain || ""} 
            onValueChange={(value) => updatePatientData('menstrualPain', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mild" id="mild-pain" />
              <Label htmlFor="mild-pain">Mild</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate-pain" />
              <Label htmlFor="moderate-pain">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="severe" id="severe-pain" />
              <Label htmlFor="severe-pain">Severe</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="no-pain" />
              <Label htmlFor="no-pain">None</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Are you pregnant or recently pregnant?</Label>
          <RadioGroup 
            value={patientData.pregnancy || ""} 
            onValueChange={(value) => updatePatientData('pregnancy', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pregnant-yes" />
              <Label htmlFor="pregnant-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pregnant-no" />
              <Label htmlFor="pregnant-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emotional-symptoms">Do you have any emotional symptoms (e.g., mood swings, anxiety)?</Label>
          <Textarea
            id="emotional-symptoms"
            placeholder="Please describe any emotional symptoms you're experiencing..."
            value={patientData.emotionalSymptoms || ""}
            onChange={(e) => updatePatientData('emotionalSymptoms', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="food-weather-female">What do you generally like/dislike in food, weather, etc.?</Label>
          <Textarea
            id="food-weather-female"
            placeholder="Please describe your preferences regarding food, weather, activities..."
            value={patientData.foodWeatherPreferences || ""}
            onChange={(e) => updatePatientData('foodWeatherPreferences', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderMaleQuestions = () => (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800">Male-Specific Health Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Do you experience frequent fatigue or weakness?</Label>
          <RadioGroup 
            value={patientData.fatigue || ""} 
            onValueChange={(value) => updatePatientData('fatigue', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="fatigue-yes" />
              <Label htmlFor="fatigue-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="fatigue-no" />
              <Label htmlFor="fatigue-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Have you noticed any prostate-related symptoms?</Label>
          <RadioGroup 
            value={patientData.prostateSymptoms || ""} 
            onValueChange={(value) => updatePatientData('prostateSymptoms', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="prostate-yes" />
              <Label htmlFor="prostate-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="prostate-no" />
              <Label htmlFor="prostate-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stress-factors">Do you face stress at work/home?</Label>
          <Textarea
            id="stress-factors"
            placeholder="Please describe any stress factors in your work or home environment..."
            value={patientData.stressFactors || ""}
            onChange={(e) => updatePatientData('stressFactors', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="food-weather-male">What do you generally like/dislike in food, weather, etc.?</Label>
          <Textarea
            id="food-weather-male"
            placeholder="Please describe your preferences regarding food, weather, activities..."
            value={patientData.foodWeatherPreferences || ""}
            onChange={(e) => updatePatientData('foodWeatherPreferences', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderOtherQuestions = () => (
    <Card className="border-purple-200 bg-purple-50/50">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">General Health Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="emotional-health">Emotional Health</Label>
          <Textarea
            id="emotional-health"
            placeholder="Please describe your emotional well-being, mood patterns, stress levels..."
            value={patientData.emotionalHealth || ""}
            onChange={(e) => updatePatientData('emotionalHealth', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sleep-patterns">Sleep Patterns</Label>
          <Textarea
            id="sleep-patterns"
            placeholder="Please describe your sleep quality, duration, any sleep-related issues..."
            value={patientData.sleepPatterns || ""}
            onChange={(e) => updatePatientData('sleepPatterns', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="general-health">General Health & Preferences</Label>
          <Textarea
            id="general-health"
            placeholder="Please describe your general health status, food/weather preferences, lifestyle..."
            value={patientData.generalHealth || ""}
            onChange={(e) => updatePatientData('generalHealth', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-primary/5 via-medical-secondary/5 to-medical-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-medical-primary hover:text-medical-primary/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-medical-primary mb-2">Patient Registration</h1>
            <p className="text-muted-foreground">Please provide your information for personalized homeopathic care</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Please provide your basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={patientData.fullName}
                    onChange={(e) => updatePatientData('fullName', e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={patientData.age}
                      onChange={(e) => updatePatientData('age', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={patientData.gender} onValueChange={(value) => updatePatientData('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Please describe your current symptoms in detail..."
                    value={patientData.symptoms}
                    onChange={(e) => updatePatientData('symptoms', e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gender-Specific Questions */}
            {patientData.gender === 'female' && renderFemaleQuestions()}
            {patientData.gender === 'male' && renderMaleQuestions()}
            {patientData.gender === 'other' && renderOtherQuestions()}

            {patientData.gender && (
              <div className="pt-6">
                <Button type="submit" className="w-full" size="lg">
                  Submit Registration
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};