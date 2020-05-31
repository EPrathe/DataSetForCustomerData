package com.example.charterHW;

public class Customer {
    private String name;
    private int id;
    private double amount;
    private String date;
    
    public Customer(int id,String name, double amount, String date) {
    	super();
		this.id = id;
		this.name=name;
		this.amount = amount;
		this.date = date;
    }
    public String getName() {
            return name;
    }
    public void setName(String name) {
            this.name = name;
    }
    
    public int getId() {
        return id;
	}
	public void setId(int id) {
	        this.id = id;
	}
	
	public double getAmount() {
        return amount;
	}
	public void setAmount(double amount) {
	        this.amount = amount;
	}
	
	public String getDate() {
        return date;
	}
	public void setDate(String date) {
	        this.date = date;
	}
    
}
