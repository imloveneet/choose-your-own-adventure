from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field


class StoryOptionLLM(BaseModel):
  text: str = Field(description="The text of the option shown to user")
  next_node: Dict[str, Any] = Field(description="The next node content and its options")

class StoryNodeLLM(BaseModel):
  content: str = Field(description="The main content of the story node")
  is_ending: bool = Field(description="Whether this node is ending node")
  is_winning_ending: bool = Field(description="Whether this node is a winning ending node")
  options: Optional[List[StoryOptionLLM]] = Field(default=None, description="The options for this node")

class StoryLLMResponse(BaseModel):
  title: str = Field(description="Title of the story")
  root_node: StoryNodeLLM = Field(description="The root node of the story")

# ADD THESE HERE 👇
# StoryNodeLLM.model_rebuild()
# StoryLLMResponse.model_rebuild()