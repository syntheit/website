"use client";

import { useState, useRef, useEffect } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { api } from "@/trpc/react";

interface ResourceSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "coding",
  "languages", 
  "wikipedia",
  "google-maps-lists",
  "games",
  "articles",
  "health",
  "travel",
  "history",
  "business",
  "geography",
  "technology",
  "random"
];

const MAX_DESCRIPTION_LENGTH = 500;
const MAX_NOTES_LENGTH = 300;

export function ResourceSuggestionModal({ isOpen, onClose }: ResourceSuggestionModalProps) {
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  
  // Honeypot field for spam prevention
  const honeypotRef = useRef<HTMLInputElement>(null);

  // tRPC mutation for submitting resource suggestions
  const submitSuggestion = api.resourceSuggestion.submit.useMutation({
    onSuccess: () => {
      setFormSuccess("Thank you! Your resource suggestion has been submitted successfully.");
      // Reset form
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("");
      setNotes("");
      
      // Close modal after a delay
      setTimeout(() => {
        handleClose();
      }, 2000);
    },
    onError: (error) => {
      setFormError(error.message || "Failed to submit suggestion. Please try again.");
    },
    });



  // Reset form state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("");
      setNotes("");
      setFormError("");
      setFormSuccess("");
      submitSuggestion.reset();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    onClose();
  };

  const validateForm = (): boolean => {
    setFormError("");
    
    // Check honeypot field
    if (honeypotRef.current?.value) {
      setFormError("Invalid submission detected.");
      return false;
    }

    // Validate required fields
    if (!title.trim()) {
      setFormError("Please enter a title for the resource.");
      return false;
    }

    if (!description.trim()) {
      setFormError("Please enter a description for the resource.");
      return false;
    }

    if (!url.trim()) {
      setFormError("Please enter a URL for the resource.");
      return false;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setFormError("Please enter a valid URL.");
      return false;
    }

    if (!category) {
      setFormError("Please select a category.");
      return false;
    }

    // Check length limits
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      setFormError(`Description is too long. Maximum ${MAX_DESCRIPTION_LENGTH} characters allowed.`);
      return false;
    }

    if (notes.length > MAX_NOTES_LENGTH) {
      setFormError(`Notes are too long. Maximum ${MAX_NOTES_LENGTH} characters allowed.`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormError("");

    // Submit using tRPC mutation
    submitSuggestion.mutate({
      title: title.trim(),
      description: description.trim(),
      url: url.trim(),
      category,
      notes: notes.trim() || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state={isOpen ? "open" : "closed"}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md rounded-lg bg-background p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        data-state={isOpen ? "open" : "closed"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-left">
            <h2 className="text-xl font-semibold">Suggest a Resource</h2>
            <p className="text-sm text-muted-foreground">
              Help me grow my collection by suggesting a new resource
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            className="absolute left-[-9999px]"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="block w-full text-left">Title *</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the resource title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="block w-full text-left">
              Description * ({description.length}/{MAX_DESCRIPTION_LENGTH})
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the resource"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="block w-full text-left">URL *</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="block w-full text-left">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="block w-full text-left">
              Additional Notes ({notes.length}/{MAX_NOTES_LENGTH})
            </Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional context or notes (optional)"
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Error/Success Messages */}
          {formError && (
            <div className="p-3 text-sm rounded-md bg-destructive/10 text-destructive">
              {formError}
            </div>
          )}
          
          {formSuccess && (
            <div className="p-3 text-sm text-green-600 rounded-md bg-green-500/10">
              {formSuccess}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitSuggestion.isPending}
            className="w-full"
          >
            {submitSuggestion.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Submit Suggestion
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
} 