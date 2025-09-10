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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import {
  Loader2,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Phone,
  MapPin,
  Star,
  Award,
  User,
} from "lucide-react";

const TrainerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/trainer-applications");
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications);
      } else {
        toast.error("Failed to fetch trainer applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewApplication = async (applicationId, status) => {
    try {
      setProcessing(true);

      const response = await fetch(
        `/api/trainer-applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            adminNotes: adminNotes,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setReviewModalOpen(false);
        setAdminNotes("");
        fetchApplications(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update application");
      }
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Error updating application");
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Trainer Applications
          </h2>
          <p className="text-muted-foreground">
            Review and manage trainer applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-medium">
            {applications.length} Applications
          </span>
        </div>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground">
              No trainer applications have been submitted.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card
              key={application._id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {application.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied: {formatDate(application.appliedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {application.phone}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(application.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Specialization:</strong>{" "}
                      {application.specialization}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Experience:</strong> {application.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Age:</strong> {application.age} years
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Motivation:</strong>
                  </p>
                  <p className="text-sm line-clamp-2">
                    {application.motivation}
                  </p>
                </div>

                {application.status !== "pending" && (
                  <div className="mb-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      {application.status === "approved"
                        ? "Approved"
                        : "Rejected"}{" "}
                      on: {formatDate(application.reviewedAt)}
                    </p>
                    {application.adminNotes && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Admin Notes:</strong> {application.adminNotes}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Trainer Application Details</DialogTitle>
                        <DialogDescription>
                          Complete application information for{" "}
                          {application.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div>
                          <h4 className="font-semibold mb-3">
                            Personal Information
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Name:</strong> {application.name}
                            </div>
                            <div>
                              <strong>Email:</strong> {application.email}
                            </div>
                            <div>
                              <strong>Phone:</strong> {application.phone}
                            </div>
                            <div>
                              <strong>Age:</strong> {application.age} years
                            </div>
                            <div className="col-span-2">
                              <strong>Address:</strong> {application.address}
                            </div>
                          </div>
                        </div>

                        {/* Professional Information */}
                        <div>
                          <h4 className="font-semibold mb-3">
                            Professional Information
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <strong>Experience:</strong>{" "}
                              {application.experience}
                            </div>
                            <div>
                              <strong>Specialization:</strong>{" "}
                              {application.specialization}
                            </div>
                            <div>
                              <strong>Certifications:</strong>
                              <p className="mt-1 text-muted-foreground">
                                {application.certifications}
                              </p>
                            </div>
                            <div>
                              <strong>Work Experience:</strong>
                              <p className="mt-1 text-muted-foreground">
                                {application.workExperience}
                              </p>
                            </div>
                            <div>
                              <strong>Availability:</strong>
                              <p className="mt-1 text-muted-foreground">
                                {application.availability}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                          <h4 className="font-semibold mb-3">
                            Additional Information
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div>
                              <strong>Motivation:</strong>
                              <p className="mt-1 text-muted-foreground">
                                {application.motivation}
                              </p>
                            </div>
                            {application.references && (
                              <div>
                                <strong>References:</strong>
                                <p className="mt-1 text-muted-foreground">
                                  {application.references}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {application.status === "pending" && (
                    <Dialog
                      open={
                        reviewModalOpen &&
                        selectedApplication?._id === application._id
                      }
                      onOpenChange={setReviewModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Review Application
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Review Application</DialogTitle>
                          <DialogDescription>
                            Review and approve or reject {application.name}
                            &apos;s trainer application
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="adminNotes">
                              Admin Notes (Optional)
                            </Label>
                            <Textarea
                              id="adminNotes"
                              value={adminNotes}
                              onChange={(e) => setAdminNotes(e.target.value)}
                              placeholder="Add any notes about your decision..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleReviewApplication(
                                application._id,
                                "rejected"
                              )
                            }
                            disabled={processing}
                          >
                            {processing ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-2" />
                            )}
                            Reject
                          </Button>
                          <Button
                            onClick={() =>
                              handleReviewApplication(
                                application._id,
                                "approved"
                              )
                            }
                            disabled={processing}
                          >
                            {processing ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerApplications;
