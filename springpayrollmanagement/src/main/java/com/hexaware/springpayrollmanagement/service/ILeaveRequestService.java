
package com.hexaware.springpayrollmanagement.service;

import java.util.List;
import com.hexaware.springpayrollmanagement.dto.LeaveRequestDTO;

public interface ILeaveRequestService {

    LeaveRequestDTO applyLeave(LeaveRequestDTO dto);
    
    
    LeaveRequestDTO approveLeave(int leaveId);
    LeaveRequestDTO rejectLeave(int leaveId);
    
    LeaveRequestDTO getLeaveById(int leaveId);
    List<LeaveRequestDTO> getAllLeaves();
    void deleteLeave(int leaveId);
}
