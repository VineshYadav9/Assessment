package com.assessment.service;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.assessment.model.Employee;
import com.assessment.repository.EmployeeRepository;

@Service
@Transactional
public class EmployeeService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	@Autowired
	EmployeeRepository dao;

	public void create(Employee dto) {
		LOGGER.info("in create method");
		dao.create(dto);
	}

	public void update(Employee dto) {
		LOGGER.info("in update method");
		dao.update(dto);
	}

	public List<Employee> getList(int startResult, int pageSize) {
		return dao.getList(startResult, pageSize);
	}

	public Employee getEmployee(int id) {
		LOGGER.info("in getEmployee method");
		return dao.getEmployee(id);
	}

	public Long getTotalEmployeeCount() {
		return dao.getTotalEmployeeCount();
	}

}
