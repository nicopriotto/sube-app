import SituationVote from "../components/SituationVote";
export default function VotePage() {
  
  const situation = {
    title: "El amigo más probable de olvidar un cumpleaños",
    description: "Selecciona a tus amigos y asigna puntos…",
    image: "/avatar.png",
  };

  const users = [
    { id: 1, name: "Elena", avatar: "/avatar.png", points: 0 },
    { id: 2, name: "Carlos", avatar: "/avatar.png", points: 0 },
    { id: 3, name: "Sofía", avatar: "/avatar.png", points: 0 },
    { id: 4, name: "Javier", avatar: "/avatar.png", points: 0 },
  ];

  return (
    <SituationVote
      image={situation.image}
      title={situation.title}
      description={situation.description}
      users={users}
    />
  );
}
