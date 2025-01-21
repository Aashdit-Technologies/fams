import React, { useState } from "react";
import { FaPlus, FaMinus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import api from "../../Api/Api";
import { encryptPayload } from "../../utils/encrypt";
import useAuthStore from "../../store/Store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "./ManageRoom.css";

const fetchRoomData = async () => {
  const token = useAuthStore.getState().token;
  const response = await api.get("/manage-room", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.roomList;
};

const saveRoomMutation = async (payload) => {
  const token = useAuthStore.getState().token;
  const encryptedMessage = encryptPayload(payload);
  const response = await api.post("/save-room-details", { dataObject: encryptedMessage }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateRoomStatusMutation = async (payload) => {
  const token = useAuthStore.getState().token;
  const encryptedMessage = encryptPayload(payload);
  await api.post(`/update-room-status/`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      dataObject: encryptedMessage,
    },
  });
};

const ManageRoom = () => {
  const [room, setRoom] = useState({ roomNumber: "", description: "" });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { data: roomData = [], isLoading, isError, refetch } = useQuery(
    ["rooms"],
    fetchRoomData,
    {
      retry: 3, 
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: saveRoom } = useMutation(saveRoomMutation, {
    onSuccess: (data) => {
      toast.success(editingRoomId ? "Room details updated successfully!" : "Room added successfully!");
      
      queryClient.invalidateQueries(["rooms"]);
      setRoom({ roomNumber: "", description: "" });
      setEditingRoomId(null);
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to save data.");
      console.error("Error saving data:", error);
    },
  });

  const { mutate: updateRoomStatus } = useMutation(updateRoomStatusMutation, {
    onSuccess: () => {
      toast.success("Room status updated!");
      
      queryClient.invalidateQueries(["rooms"]);
    },
    onError: (error) => {
      toast.error("Failed to update room status.");
      console.error("Error updating room status:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({ ...prevRoom, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

   
    if (!room.roomNumber || room.roomNumber <= 0) {
      toast.error("Please enter a valid room number.");
      setIsSubmitting(false);
      return;
    }

    if (!room.description) {
      toast.error("Please enter a room description.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      roomNumber: room.roomNumber,
      description: room.description,
      docRoomId: editingRoomId,
    };

    saveRoom(payload);
    setIsSubmitting(false);
  };

  const handleStatusToggle = (room) => {
    const updatedStatus = !room.isActive;
    const payload = {
      docRoomId: room.docRoomId,
      isActive: updatedStatus,
    };
    updateRoomStatus(payload);
  };

  const toggleFormAccordion = () => setIsFormOpen(!isFormOpen);
  const toggleTableAccordion = () => setIsTableOpen(!isTableOpen);

  const handleEdit = (room) => {
    setRoom({
      roomNumber: room.roomNumber,
      description: room.description,
    });
    setEditingRoomId(room.docRoomId);
    setIsFormOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching rooms</div>;

  return (
    <div className="diary-section-container">
      {/* Form Accordion */}
      <div className="accordion-header" onClick={toggleFormAccordion}>
        <span className="accordion-title">
          {editingRoomId ? "Edit Room Details" : "Add Room Details"}
        </span>
        <span className="accordion-icon">
          {isFormOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
      {isFormOpen && (
        <div className="accordion-body">
          <form onSubmit={handleSubmit} className="row">
            <div className="form-group col-md-3">
              <label htmlFor="roomNumber">Room Number:</label>
              <input
                type="text"
                className="form-control"
                id="roomNumber"
                name="roomNumber"
                value={room.roomNumber}
                onChange={handleInputChange}
                placeholder="Enter room number"
              />
            </div>

            <div className="form-group col-md-3">
              <label htmlFor="description">Room Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={room.description}
                onChange={handleInputChange}
                placeholder="Enter room description"
              ></textarea>
            </div>
            <div className="col-md-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : editingRoomId
                  ? "Update Room"
                  : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="accordion-header mt-5" onClick={toggleTableAccordion}>
        <span className="accordion-title">View Rooms</span>
        <span className="accordion-icon">
          {isTableOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
      {isTableOpen && (
        <div className="accordion-body">
          <table className="table">
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Description</th>
                <th>Rack Count</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomData.length > 0 ? (
                roomData.map((room) => (
                  <tr key={room.docRoomId}>
                    <td>{room.roomNumber}</td>
                    <td>{room.description}</td>
                    <td>{room.rackCount}</td>
                    <td>{room.isActive ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${room.isActive ? "btn-danger" : "btn-success"}`}
                        onClick={() => handleStatusToggle(room)}
                      >
                        {room.isActive ? <FaTimes /> : <FaCheck />}
                      </button>
                      <button
                        className="btn btn-sm btn-warning ms-2"
                        onClick={() => handleEdit(room)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRoom;
