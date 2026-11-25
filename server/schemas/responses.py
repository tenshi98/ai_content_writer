"""Modelo de respuesta del redactor de contenido."""
from pydantic import BaseModel, Field


class ContentResponse(BaseModel):
    """Contenido generado por el modelo."""

    content: str = Field(..., description="Artículo o texto generado por Ollama.")
