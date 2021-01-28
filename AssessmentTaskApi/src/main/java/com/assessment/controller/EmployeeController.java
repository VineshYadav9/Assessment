package com.assessment.controller;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assessment.model.CustomeResponseBody;
import com.assessment.model.Employee;
import com.assessment.model.EmployeeList;
import com.assessment.service.EmployeeService;

@RestController
@CrossOrigin(origins = { "${app.api.settings.cross-origin.urls}" })
@RequestMapping(value = { "/employee" })
public class EmployeeController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
	@Autowired
	public EmployeeService employeeService;

	@Autowired
	public CustomeResponseBody customeResponseBody;

	@PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> create(@RequestBody Employee employee) {
		employee.setDeleted(false);
		LOGGER.info("before adding record " + employee.toString());
		employeeService.create(employee);
		customeResponseBody.setMessage("Crerated");
		LOGGER.info("Record added successfully");
		return new ResponseEntity<CustomeResponseBody>(customeResponseBody, HttpStatus.CREATED);
	}

	@PostMapping(value = "/updateEmployee")
	public ResponseEntity<?> updateStatus(@RequestBody Employee employee) {
		LOGGER.info("before udating record " + employee.toString());
		employeeService.update(employee);
		customeResponseBody.setMessage("updated");
		LOGGER.info("Record updated successfully");
		return new ResponseEntity<CustomeResponseBody>(customeResponseBody, HttpStatus.NO_CONTENT);
	}

	@GetMapping(value = "/getEmployee/{id}")
	public ResponseEntity<?> getEmployee(@PathVariable("id") int id) {
		Employee employee = employeeService.getEmployee(id);
		LOGGER.info("Record for id  =  " + id + " fatched is =" + employee.toString());
		return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	}

	@GetMapping(value = "/employeeList/{startResult}/{pageSize}")
	public ResponseEntity<EmployeeList> getList(@PathVariable("startResult") int startResult,
			@PathVariable("pageSize") int pageSize) {
		List<Employee> list = employeeService.getList(startResult, pageSize);
		EmployeeList employeeList = new EmployeeList();
		Long count = employeeService.getTotalEmployeeCount();
		employeeList.setCount(count);
		employeeList.setList(list);
		LOGGER.info("in getList");
		return new ResponseEntity<EmployeeList>(employeeList, HttpStatus.OK);
	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") int id) {
		Employee employee = employeeService.getEmployee(id);
		if (employee != null) {
			employee.setDeleted(true);
			employeeService.update(employee);
			customeResponseBody.setMessage("Record has been Deleted");
			LOGGER.info("Record has been Deleted");
		} else {
			customeResponseBody.setMessage("Record not found");
			LOGGER.info("Record not found while deleting");
		}
		return new ResponseEntity<CustomeResponseBody>(customeResponseBody, HttpStatus.NO_CONTENT);
	}
}
