package com.example.charterHW;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HardcodedService {

  private static List<Customer> customers = new ArrayList<>();
  private static long idCounter = 0;

  static {
	  customers.add(new Customer(1, "Sam", 120,"03-15-2020"));
	  customers.add(new Customer(2, "Ally", 145,"04-15-2020"));
	  customers.add(new Customer(1, "Sam", 245,"05-15-2020"));
	  customers.add(new Customer(3, "Beth", 99,"03-15-2020"));
	  customers.add(new Customer(4, "Alex", 50,"03-15-2020"));
	  customers.add(new Customer(2, "Ally", 125,"04-15-2020"));
	  customers.add(new Customer(1, "Sam", 145,"05-15-2020"));
	  customers.add(new Customer(3, "Beth", 1,"04-15-2020"));
  }

  public List<Customer> findAll() {
    return customers;
  }
}
