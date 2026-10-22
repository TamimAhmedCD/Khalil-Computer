"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, Zap, AlertCircle, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// Free AI Providers Configuration
const AI_PROVIDERS = [
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's powerful free AI model",
    models: [
      { value: "gemini-2.0-flash-exp", label: "Gemini 2.0 Flash (Fast)", free: true },
      { value: "gemini-2.0-flash-thinking-exp:120b", label: "Gemini 2.0 Flash Thinking (Advanced)", free: true },
      { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash", free: true },
    ],
    defaultModel: "gemini-2.0-flash-exp",
    getEndpoint: (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Access 200+ AI models with one API",
    models: [
      { value: "google/gemini-2.0-flash-exp:free", label: "Google Gemini (Free)", free: true },
      { value: "meta-llama/llama-3-2-1b-instruct:free", label: "Llama 3.2 1B (Free)", free: true },
      { value: "mistralai/mistral-7b-instruct:free", label: "Mistral 7B (Free)", free: true },
      { value: "google/gemini-2.5-flash", label: "Gemini 2.5 Flash", free: false },
    ],
    defaultModel: "google/gemini-2.0-flash-exp:free",
    getEndpoint: () => "https://openrouter.ai/api/v1/chat/completions",
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "OpenAI models (GPT-4o mini, GPT-3.5)",
    models: [
      { value: "gpt-4o-mini", label: "GPT-4o Mini", free: false },
      { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", free: false },
    ],
    defaultModel: "gpt-4o-mini",
    getEndpoint: () => "https://api.openai.com/v1/chat/completions",
  },
  {
    id: "deepinfra",
    name: "DeepInfra (Free)",
    description: "Free Llama, Mistral models",
    models: [
      { value: "meta-llama/llama-3-2-3b-instruct", label: "Llama 3.2 3B", free: true },
      { value: "mistralai/mistral-7b-instruct", label: "Mistral 7B", free: true },
      { value: "teknium/openhermes-2.5-mistral-7b", label: "OpenHermes 2.5", free: true },
    ],
    defaultModel: "meta-llama/llama-3-2-3b-instruct",
    getEndpoint: () => "https://api.deepinfra.com/v1/openai/chat/completions",
  },
  {
    id: "groq",
    name: "Groq (Free)",
    description: "Ultra-fast inference",
    models: [
      { value: "llama-3-8b-8192", label: "Llama 3 8B", free: true },
      { value: "llama3-70b-8192", label: "Llama 3 70B", free: true },
      { value: "mixtral-8x7b-32768", label: "Mixtral 8x7B", free: true },
    ],
    defaultModel: "llama-3-8b-8192",
    getEndpoint: () => "https://api.groq.com/openai/v1/chat/completions",
  },
  {
    id: "free-ai",
    name: "Free AI (100% Free)",
    description: "Fully free tier options",
    models: [
      { value: "qwen/qwen-2-7b-instruct:free", label: "Qwen 2 7B (Free)", free: true },
      { value: "jondurbin/airoboros-l2-70b", label: "Airoboros 70B (Free)", free: true },
    ],
    defaultModel: "qwen/qwen-2-7b-instruct:free",
    getEndpoint: () => "https://openrouter.ai/api/v1/chat/completions",
  },
];

export default function AIProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testingId, setTestingId] = useState(null);
  const [reordering, setReordering] = useState(false);

  // Form states
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [selectedProviderType, setSelectedProviderType] = useState("gemini");
  const [selectedModel, setSelectedModel] = useState("");
  const [formData, setFormData] = useState({
    provider: "",
    model: "",
    type: "gemini",
    apiKey: "",
    endpoint: "",
    priority: 50,
    freeTier: true,
    status: "active",
    notes: "",
  });

  // Fetch providers
  const fetchProviders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/ai-providers");
      setProviders(response.data.providers || []);
    } catch (error) {
      console.error("Failed to fetch providers:", error);
      toast.error("Failed to load AI providers", {
        description: error.response?.data?.error || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Auto-fill model and endpoint when type changes
  useEffect(() => {
    const providerConfig = AI_PROVIDERS.find(p => p.id === selectedProviderType);
    if (providerConfig) {
      setFormData(prev => ({
        ...prev,
        provider: providerConfig.name,
        type: selectedProviderType,
        model: selectedModel || providerConfig.defaultModel,
        endpoint: providerConfig.getEndpoint(selectedModel || providerConfig.defaultModel),
        freeTier: providerConfig.models.some(m => m.value === (selectedModel || providerConfig.defaultModel))
          ? providerConfig.models.find(m => m.value === (selectedModel || providerConfig.defaultModel)).free
          : false,
      }));
    }
  }, [selectedProviderType, selectedModel]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type) => {
    setSelectedProviderType(type);
    const providerConfig = AI_PROVIDERS.find(p => p.id === type);
    if (providerConfig) {
      setSelectedModel(providerConfig.defaultModel);
    }
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
    const providerConfig = AI_PROVIDERS.find(p => p.id === selectedProviderType);
    if (providerConfig) {
      const modelConfig = providerConfig.models.find(m => m.value === model);
      setFormData(prev => ({
        ...prev,
        model: model,
        endpoint: providerConfig.getEndpoint(model),
        freeTier: modelConfig?.free || false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData };
      if (payload.apiKey === "**********") {
        delete payload.apiKey;
      }

      if (editingProvider) {
        await axios.put(`/api/admin/ai-providers/${editingProvider._id}`, payload);
        toast.success("AI provider updated", {
          description: "The provider has been updated successfully",
        });
      } else {
        await axios.post("/api/admin/ai-providers", payload);
        toast.success("AI provider added", {
          description: "New AI provider has been added successfully",
        });
      }

      setShowAddDialog(false);
      setEditingProvider(null);
      setFormData({
        provider: "",
        model: "",
        type: "gemini",
        apiKey: "",
        endpoint: "",
        priority: 50,
        freeTier: true,
        status: "active",
        notes: "",
      });
      setSelectedProviderType("gemini");
      setSelectedModel("");

      fetchProviders();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(editingProvider ? "Update failed" : "Add failed", {
        description: error.response?.data?.error || "Please check your inputs",
      });
    }
  };

  const handleEdit = (provider) => {
    setEditingProvider(provider);
    setSelectedProviderType(provider.type);
    setSelectedModel(provider.model);
    setFormData({
      provider: provider.provider,
      model: provider.model,
      type: provider.type,
      apiKey: "",
      endpoint: provider.endpoint,
      priority: provider.priority || 50,
      freeTier: provider.freeTier || false,
      status: provider.status || "active",
      notes: provider.notes || "",
    });
    setShowAddDialog(true);
  };

  const handleDelete = async (providerId) => {
    if (!confirm("Are you sure you want to delete this AI provider?")) return;

    try {
      await axios.delete(`/api/admin/ai-providers/${providerId}`);
      toast.success("Provider deleted", {
        description: "The AI provider has been deleted",
      });
      fetchProviders();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete failed", {
        description: error.response?.data?.error || "Could not delete provider",
      });
    }
  };

  const handleTestProvider = async (providerId) => {
    try {
      setTestingId(providerId);
      const response = await axios.post(`/api/admin/ai-providers/${providerId}`);

      if (response.data.success) {
        toast.success("Provider test successful", {
          description: "The AI provider is working correctly",
        });
      } else {
        toast.error("Provider test failed", {
          description: response.data.message || "The provider did not respond correctly",
        });
      }

      fetchProviders();
    } catch (error) {
      console.error("Test error:", error);
      toast.error("Test failed", {
        description: error.response?.data?.error || "Could not test the provider",
      });
    } finally {
      setTestingId(null);
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;

    const updatedProviders = [...providers];
    const [provider] = updatedProviders.splice(index, 1);
    updatedProviders.splice(index - 1, 0, provider);

    const reorderedProviders = updatedProviders.map((p, idx) => ({
      ...p,
      priority: idx + 1,
    }));

    setProviders(reorderedProviders);
    setReordering(true);

    try {
      await axios.put("/api/admin/ai-providers", {
        providers: reorderedProviders.map(p => ({
          _id: p._id,
          priority: p.priority,
          status: p.status,
        }))
      });
      toast.success("Priority updated", {
        description: "Provider priority has been updated",
      });
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Reorder failed", {
        description: "Could not update priorities",
      });
    } finally {
      setReordering(false);
    }
  };

  const handleMoveDown = async (index) => {
    if (index === providers.length - 1) return;

    const updatedProviders = [...providers];
    const [provider] = updatedProviders.splice(index, 1);
    updatedProviders.splice(index + 1, 0, provider);

    const reorderedProviders = updatedProviders.map((p, idx) => ({
      ...p,
      priority: idx + 1,
    }));

    setProviders(reorderedProviders);
    setReordering(true);

    try {
      await axios.put("/api/admin/ai-providers", {
        providers: reorderedProviders.map(p => ({
          _id: p._id,
          priority: p.priority,
          status: p.status,
        }))
      });
      toast.success("Priority updated", {
        description: "Provider priority has been updated",
      });
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Reorder failed", {
        description: "Could not update priorities",
      });
    } finally {
      setReordering(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "testing":
        return <Badge variant="outline" className="bg-yellow-500">Testing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const isFreeTier = (provider) => {
    const providerConfig = AI_PROVIDERS.find(p => p.id === provider.type);
    if (!providerConfig) return false;
    return providerConfig.models.some(m => m.value === provider.model && m.free);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Provider Management</h1>
          <p className="text-muted-foreground">
            Add your AI API keys - we'll auto-select the model and endpoint
          </p>
        </div>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProvider(null); setShowAddDialog(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProvider ? "Edit AI Provider" : "Add New AI Provider"}
              </DialogTitle>
              <DialogDescription>
                {editingProvider
                  ? "Update the AI provider configuration"
                  : "Add a new AI provider to your system. Just type your API key - we auto-select model & endpoint!"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">AI Provider Type *</label>
                <Select
                  value={selectedProviderType}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_PROVIDERS.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex flex-col">
                          <span>{provider.name}</span>
                          <span className="text-xs text-muted-foreground">{provider.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Model *</label>
                <Select
                  value={selectedModel}
                  onValueChange={handleModelChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_PROVIDERS.find(p => p.id === selectedProviderType)?.models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        <div className="flex items-center gap-2">
                          <span>{model.label}</span>
                          {model.free && <Badge variant="outline" className="text-green-600 border-green-200">Free</Badge>}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">API Key *</label>
                <Input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  placeholder="Paste your API key here"
                  required={!editingProvider}
                />
                {editingProvider && (
                  <p className="text-xs text-muted-foreground">
                    Leave empty to keep existing API key
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Auto-configured: <strong>{formData.provider}</strong> → <strong>{formData.model}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority (1-99)</label>
                  <Input
                    type="number"
                    min="1"
                    max="99"
                    value={formData.priority}
                    onChange={(e) => handleInputChange("priority", parseInt(e.target.value) || 50)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    checked={formData.freeTier}
                    onCheckedChange={(checked) => handleInputChange("freeTier", checked)}
                  />
                  <label className="text-sm font-medium">Free Tier</label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Add any notes about this provider..."
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProvider ? "Update Provider" : "Add Provider"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configured AI Providers</CardTitle>
          <CardDescription>
            System tries providers in priority order (1 = highest). Add multiple for automatic fallback!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : providers.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">
                No AI providers configured yet.
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>Just paste your API key - we auto-select model & endpoint!</span>
              </div>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Provider
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Priority</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Free</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {providers.sort((a, b) => (a.priority || 99) - (b.priority || 99)).map((provider, index) => (
                    <TableRow key={provider._id}>
                      <TableCell>
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0 || reordering}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </Button>
                          <span className="font-bold">{provider.priority || index + 1}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === providers.length - 1 || reordering}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{provider.provider}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded max-w-[200px] truncate">
                          {provider.model}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {provider.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(provider.status)}</TableCell>
                      <TableCell>
                        {isFreeTier(provider) ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            ✅ Free
                          </Badge>
                        ) : (
                          <Badge variant="outline">Paid</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTestProvider(provider._id)}
                            disabled={testingId === provider._id}
                          >
                            {testingId === provider._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Zap className="w-3 h-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(provider)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(provider._id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <strong>Simple Setup:</strong> Just enter API type + key
              </div>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <strong>Auto-Fallback:</strong> System tries all providers
              </div>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <strong>Priority Order:</strong> Control which AI to try first
              </div>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              <div>
                <strong>Free Models:</strong> Many free tier options available
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Free AI Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {AI_PROVIDERS.filter(p => p.id !== 'openai').map(provider => (
              <div key={provider.id} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{provider.name}</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Free</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{provider.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Supported Providers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {AI_PROVIDERS.map(provider => (
              <div key={provider.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${provider.id === 'openai' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                <span className="text-sm">{provider.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
