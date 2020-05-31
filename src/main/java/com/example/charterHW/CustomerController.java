package com.example.charterHW;

import com.example.charterHW.Customer.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {
	
	@Autowired
	  private HardcodedService managementService;

	 @RequestMapping("/customers")
	    public List <Customer>getAllCustomers() {
	        return managementService.findAll();
	    }
}

//@RestController
//public class CustomerController {
//    @RequestMapping("/greeting")
//    public Customer greeting(@RequestParam(value="name", defaultValue="World") String name) {
//        return new Customer(name);
//    }
//}
