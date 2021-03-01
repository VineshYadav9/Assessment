package com.assessment.repository;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.assessment.model.Employee;

@Repository
@Transactional
public class EmployeeRepository {

	@Autowired
	private SessionFactory sessionFactory;
	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	public void create(Employee obj) {
		Session session = sessionFactory.getCurrentSession();
		session.save(obj);
	}

	public void update(Employee dto) {
		Session session = sessionFactory.getCurrentSession();
		session.update(dto);
	}

	public Employee getEmployee(int id) {
		Session session = sessionFactory.getCurrentSession();
		Criteria crit = session.createCriteria(Employee.class);
		Criterion ct1 = Restrictions.eq("id", id);
		Criterion ct2 = Restrictions.eq("isDeleted", false);
		Criterion ct = Restrictions.and(ct1, ct2);
		crit.add(ct);
		List<Employee> list = crit.list();
		if (list.size() > 0) {
			LOGGER.info("Record  found while fatching for id  =" + id);
			return list.get(0);
		} else {
			LOGGER.info("Record not found while fatching for id =" + id);
			return null;
		}
	}

	public List<Employee> getList(int startResult, int pageSize) {
		System.out.println(startResult);
		System.out.println(pageSize);
		Session session = sessionFactory.getCurrentSession();
		Criteria criteria = session.createCriteria(Employee.class);
		criteria.add(Restrictions.eq("isDeleted", false));
		criteria.setFirstResult(startResult);
		criteria.setMaxResults((startResult + pageSize) - 1);
		List<Employee> list = criteria.list();
		return list;
	}

	public Long getTotalEmployeeCount() {
		Session session = sessionFactory.getCurrentSession();
		Criteria criteriaCount = session.createCriteria(Employee.class);
		criteriaCount.add(Restrictions.eq("isDeleted", false));
		criteriaCount.setProjection(Projections.rowCount());
		Long count = (Long) criteriaCount.uniqueResult();
		return count;
	}

}
