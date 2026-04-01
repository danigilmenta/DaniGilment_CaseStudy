package com.hexaware.springpayrollmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.springpayrollmanagement.dto.LeaveRequestDTO;
import com.hexaware.springpayrollmanagement.entity.Employee;
import com.hexaware.springpayrollmanagement.entity.LeaveRequest;
import com.hexaware.springpayrollmanagement.repo.EmployeeRepo;
import com.hexaware.springpayrollmanagement.repo.LeaveRequestRepo;

@Service
public class LeaveRequestServiceImpl implements ILeaveRequestService {

    @Autowired
    private LeaveRequestRepo repo;

    @Autowired
    private EmployeeRepo employeeRepo;

    public static LeaveRequestDTO mapEntity2Dto(LeaveRequest leave){

        if(leave == null) return null;

        LeaveRequestDTO dto = new LeaveRequestDTO();

        dto.setLeaveId(leave.getLeaveId());
        dto.setLeaveType(leave.getLeaveType());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setReason(leave.getReason());
        dto.setStatus(leave.getStatus());

        if(leave.getEmployee()!=null)
            dto.setEmpId(leave.getEmployee().getEmpId());

        return dto;
    }

    @Override
    public LeaveRequestDTO applyLeave(LeaveRequestDTO dto){

        LeaveRequest leave = new LeaveRequest();

        leave.setLeaveType(dto.getLeaveType());
        leave.setStartDate(dto.getStartDate());
        leave.setEndDate(dto.getEndDate());
        leave.setReason(dto.getReason());
        leave.setStatus("PENDING");

        Employee emp = employeeRepo.findById(dto.getEmpId()).orElse(null);

        leave.setEmployee(emp);

        return mapEntity2Dto(repo.save(leave));
    }

    @Override
    public LeaveRequestDTO approveLeave(int leaveId){

        LeaveRequest leave = repo.findById(leaveId).orElse(null);

        leave.setStatus("APPROVED");

        return mapEntity2Dto(repo.save(leave));
    }

    @Override
    public LeaveRequestDTO rejectLeave(int leaveId){

        LeaveRequest leave = repo.findById(leaveId).orElse(null);

        leave.setStatus("REJECTED");

        return mapEntity2Dto(repo.save(leave));
    }

    @Override
    public LeaveRequestDTO getLeaveById(int leaveId){

        return mapEntity2Dto(repo.findById(leaveId).orElse(null));
    }

    @Override
    public List<LeaveRequestDTO> getAllLeaves(){

        List<LeaveRequestDTO> list = new ArrayList<>();

        for(LeaveRequest leave : repo.findAll()){

            list.add(mapEntity2Dto(leave));
        }

        return list;
    }

    @Override
    public void deleteLeave(int leaveId){

        repo.deleteById(leaveId);
    }
}