"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Save, RefreshCw, Upload, Camera } from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const UpdateProfile = ({ user }) => {
    const { data: session, update: updateSession } = useSession();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        emergencyContact: "",
        fitnessGoals: "",
        image: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [imageKey, setImageKey] = useState(0); // Force re-render of image

    // Fetch current user data when component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/users/me");
                if (response.ok) {
                    const userData = await response.json();
                    setFormData({
                        name: userData.name || "",
                        email: userData.email || "",
                        phone: userData.phone || "",
                        address: userData.address || "",
                        dateOfBirth: userData.dateOfBirth || "",
                        emergencyContact: userData.emergencyContact || "",
                        fitnessGoals: userData.fitnessGoals || "",
                        image: userData.image || "",
                    });
                } else {
                    console.error("Failed to fetch user data");
                    // Fallback to session user data
                    setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        phone: user?.phone || "",
                        address: user?.address || "",
                        dateOfBirth: user?.dateOfBirth || "",
                        emergencyContact: user?.emergencyContact || "",
                        fitnessGoals: user?.fitnessGoals || "",
                        image: user?.image || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Fallback to session user data
                setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                    address: user?.address || "",
                    dateOfBirth: user?.dateOfBirth || "",
                    emergencyContact: user?.emergencyContact || "",
                    fitnessGoals: user?.fitnessGoals || "",
                    image: user?.image || "",
                });
            } finally {
                setIsFetching(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            Swal.fire({
                title: "Invalid File Type!",
                text: "Please select an image file.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        // Validate file size (1MB max)
        if (file.size > 1024 * 1024) {
            Swal.fire({
                title: "File Too Large!",
                text: "Please select an image smaller than 1MB.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            return;
        }

        setIsUploadingImage(true);

        try {
            // Step 1: Upload image to Cloudinary
            const uploadFormData = new FormData();
            uploadFormData.append("file", file);

            const uploadResponse = await fetch("/api/upload/image", {
                method: "POST",
                body: uploadFormData,
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error || "Failed to upload image");
            }

            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;

            // Step 2: Immediately save the image URL to the database
            const updateResponse = await fetch("/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    address: formData.address.trim(),
                    dateOfBirth: formData.dateOfBirth,
                    emergencyContact: formData.emergencyContact.trim(),
                    fitnessGoals: formData.fitnessGoals.trim(),
                    image: imageUrl,
                }),
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(errorData.error || "Failed to save image to profile");
            }

            const updateData = await updateResponse.json();

            // Step 3: Update local state and session
            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));

            // Force image re-render
            setImageKey((prev) => prev + 1);

            // Update the session with new image
            await updateSession({
                ...session,
                user: {
                    ...session.user,
                    image: imageUrl,
                },
            });

            Swal.fire({
                title: "Success!",
                text: "Profile picture uploaded and saved successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
        } catch (error) {
            console.error("Image upload error:", error);
            Swal.fire({
                title: "Upload Failed!",
                text: error.message || "Failed to upload image. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name.trim()) {
            Swal.fire({
                title: "Validation Error!",
                text: "Name is required.",
                icon: "warning",
                confirmButtonColor: "#f59e0b",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    phone: formData.phone.trim(),
                    address: formData.address.trim(),
                    dateOfBirth: formData.dateOfBirth,
                    emergencyContact: formData.emergencyContact.trim(),
                    fitnessGoals: formData.fitnessGoals.trim(),
                    image: formData.image,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update the session with new user data
                await updateSession({
                    ...session,
                    user: {
                        ...session.user,
                        name: data.user.name,
                        phone: data.user.phone,
                        address: data.user.address,
                        dateOfBirth: data.user.dateOfBirth,
                        emergencyContact: data.user.emergencyContact,
                        fitnessGoals: data.user.fitnessGoals,
                        image: data.user.image,
                    },
                });

                // Update local form data to reflect the changes
                setFormData((prev) => ({
                    ...prev,
                    name: data.user.name,
                    phone: data.user.phone || "",
                    address: data.user.address || "",
                    dateOfBirth: data.user.dateOfBirth || "",
                    emergencyContact: data.user.emergencyContact || "",
                    fitnessGoals: data.user.fitnessGoals || "",
                    image: data.user.image || "",
                }));

                Swal.fire({
                    title: "Success!",
                    text: "Your profile has been updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
            } else {
                throw new Error(data.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to update profile. Please try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                    </div>
                </div>
                <div className="flex items-center justify-center p-8">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                    <span className="ml-2">Loading profile data...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                </div>
            </div>

            {/* Profile Picture Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Picture
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <Avatar key={imageKey} className="h-20 w-20">
                                <AvatarImage src={formData.image || session?.user?.image || user?.image} />
                                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                                    {(formData.name || user?.name)?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            {isUploadingImage && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <RefreshCw className="h-6 w-6 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploadingImage}
                                    className="flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    {isUploadingImage ? "Uploading..." : "Upload New Picture"}
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    disabled
                                    className="bg-gray-50"
                                />
                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                                <Input
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    type="text"
                                    value={formData.emergencyContact}
                                    onChange={handleInputChange}
                                    placeholder="Emergency contact number"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                                <Input
                                    id="fitnessGoals"
                                    name="fitnessGoals"
                                    type="text"
                                    value={formData.fitnessGoals}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Weight loss, Muscle gain"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                {isLoading ? "Updating..." : "Update Profile"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateProfile;
