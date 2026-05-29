import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../util";
import LoadingStatus from "./LoadingStatus";
import StoryGame from "./StoryGame";

const StoryLoader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStory = async (storyId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stories/${storyId}/complete`,
      );
      setStory(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Story is not found.");
      } else {
        setError("Failed to load story");
      }
    } finally {
      setLoading(false);
    }
  };

  const createNewStory = () => {
    navigate("/");
  };

  useEffect(() => {
    loadStory(id);
  }, [id]);

  if (loading) {
    return <LoadingStatus theme={"story"} />;
  }

  if (error) {
    return (
      <div className="story-loader">
        <div className="error-message">
          <h2>Story not found</h2>
          <p>{error}</p>
          <button onClick={createNewStory}>Go to story generator</button>
        </div>
      </div>
    );
  }

  if (story) {
    return (
      <div className="story-loader">
        <StoryGame onNewStory={createNewStory} story={story} />
      </div>
    );
  }
  // return <div>StoryLoader</div>;
};

export default StoryLoader;
