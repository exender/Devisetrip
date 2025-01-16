import { useState, useEffect } from "react";

interface Trip {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  budget_vac: number;
}

const CompletedTrips = () => {
  const [completedTrips, setCompletedTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetch("/api/trips/completed")
      .then((res) => res.json())
      .then((data) => setCompletedTrips(data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  return (
    <div>
      <h1>Voyages passés</h1>
      <ul>
        {completedTrips.map((trip) => (
         // affichage des voyages passés 
            <li >
                <h2>{trip.title}</h2>
                <p>
                <strong>Destination :</strong> {trip.destination}
                </p>
                <p>
                <strong>Début :</strong> {trip.startDate}
                </p>
                <p>
                <strong>Fin :</strong> {trip.endDate}
                </p>
                <p>
                <strong>Budget :</strong> {trip.budget} €
                </p>
                <p>
                <strong>Budget vacances :</strong> {trip.budget_vac} €
                </p>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedTrips;
