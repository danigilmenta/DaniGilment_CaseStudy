package com.hexaware.springpayrollmanagement.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.springpayrollmanagement.dto.LeaveRequestDTO;
import com.hexaware.springpayrollmanagement.service.ILeaveRequestService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private ILeaveRequestService service;

    @PostMapping("/apply")
    public LeaveRequestDTO applyLeave(@RequestBody LeaveRequestDTO dto){
        return service.applyLeave(dto);
    }

    @PutMapping("/approve/{id}")
    public LeaveRequestDTO approveLeave(@PathVariable int id){
        return service.approveLeave(id);
    }

    @PutMapping("/reject/{id}")
    public LeaveRequestDTO rejectLeave(@PathVariable int id){
        return service.rejectLeave(id);
    }

    @GetMapping("/{id}")
    public LeaveRequestDTO getLeaveById(@PathVariable int id){
        return service.getLeaveById(id);
    }

    @GetMapping("/all")
    public List<LeaveRequestDTO> getAllLeaves(){
        return service.getAllLeaves();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteLeave(@PathVariable int id){

        service.deleteLeave(id);

        return "Leave Deleted Successfully";
    }
}