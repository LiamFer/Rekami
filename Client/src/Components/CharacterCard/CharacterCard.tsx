import { Skeleton, Typography } from "antd";
import { AnimeCharacter } from "../../Types/AnimeCharacter";
import "./characterCard.css";
const {Text} = Typography

export default function CharacterCard({
  character,
  loading,
}: {
  character: AnimeCharacter | undefined;
  loading: boolean;
}) {
  return (
    <div className="character-card-wrapper">
      {loading || !character ? (
        <Skeleton.Image
          active
          className="antSkeletonImage"
          style={{ height: "300px", width: "100%" }}
        />
      ) : (
        <>
          <img
            src={character.character.images.jpg.image_url}
            alt={character.character.name}
            className="character-card-image"
          />
          <div className="character-card-content">
            <h3 style={{margin:0}}>{character.character.name}</h3>
            <Text type="secondary" style={{margin:0}}>{character.role}</Text>
          </div>
        </>
      )}
    </div>
  );
}
