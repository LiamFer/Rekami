import { Skeleton, Button } from "antd";
import { AnimeCharacter } from "../../Types/AnimeCharacter";

export default function CharacterCard({
  character,
  loading,
}: {
  character: AnimeCharacter | undefined;
  loading: boolean;
}) {

  return (

      <div className="media-card-wrapper">
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
              className="media-card-image"
            />
            <div className="media-card-content">
              <h3>{character.character.name}</h3>
              <div className="media-card-footer">
                <p>{character.character.name}</p>
                <Button type="primary" size="small">
                  Open
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
  );
}
