import { AutoComplete, Avatar, Input, Spin } from "antd";
import type { AutoCompleteProps } from "antd";
import { useState } from "react";
import debounce from "lodash/debounce";
import { getSearchAnime } from "../../Services/jikan.service";
import { useNavigate } from "react-router-dom";

export default function MediaSearchBar() {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();

  const searchMedia = debounce(async (searchText: string) => {
    if (!searchText) return;
    setLoading(true);

    const response = await getSearchAnime(searchText);
    const searchResults = response.map((media) => {
      return {
        value: media.mal_id,
        label: (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar
              size="large"
              src={media.images.jpg.small_image_url}
              style={{
                color: "white",
                minWidth: "40px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <strong style={{ margin: 0 }}>{media.title}</strong>
              <small style={{ margin: 0 }}>{media.title_english}</small>
            </div>
          </div>
        ),
      };
    });

    setOptions(searchResults);
    setLoading(false);
  }, 400);

  const onSelect = (mediaID: string) => {
    setInputValue("");
    setOptions([]);
    navigate(`media/${mediaID}`);
  };

  return (
    <AutoComplete
      className="searchBar"
      options={options}
      onSearch={(text) => {
        setInputValue(text); 
        searchMedia(text);
      }}
      onSelect={onSelect}
      value={inputValue}
      notFoundContent={loading ? <Spin size="small" /> : "No Results"}
    >
      <Input.Search placeholder="Search your Movie/Anime" />
    </AutoComplete>
  );
}
