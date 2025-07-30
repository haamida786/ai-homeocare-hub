import { useState } from "react";
import { HomePage } from "@/components/HomePage";
import { DoctorRegister } from "@/components/DoctorRegister";
import { DoctorDashboard } from "@/components/DoctorDashboard";
import { PatientPortal } from "@/components/PatientPortal";
import { PatientRegistration } from "@/components/PatientRegistration";

type View = "home" | "doctor-register" | "doctor-dashboard" | "patient-portal" | "patient-register";

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);

  const handleDoctorSuccess = (doctorData: Doctor) => {
    setCurrentDoctor(doctorData);
    setCurrentView("doctor-dashboard");
  };

  const handleLogout = () => {
    setCurrentDoctor(null);
    setCurrentView("home");
  };

  if (currentView === "home") {
    return (
      <HomePage 
        onDoctorRegister={() => setCurrentView("doctor-register")}
        onPatientLogin={() => setCurrentView("patient-portal")}
        onPatientRegister={() => setCurrentView("patient-register")}
      />
    );
  }

  if (currentView === "doctor-register") {
    return (
      <DoctorRegister 
        onBack={() => setCurrentView("home")}
        onLogin={() => setCurrentView("doctor-register")}
        onSuccess={handleDoctorSuccess}
      />
    );
  }

  if (currentView === "doctor-dashboard" && currentDoctor) {
    return (
      <DoctorDashboard 
        doctor={currentDoctor}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === "patient-portal") {
    return (
      <PatientPortal 
        onBack={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "patient-register") {
    return (
      <PatientRegistration 
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return null;
};

export default Index;
