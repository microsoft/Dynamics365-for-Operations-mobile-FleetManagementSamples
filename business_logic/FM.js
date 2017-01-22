function main(metadataService, dataService, cacheService, $q) {
	// Design for Reservation details page
	var getReservationDetailsDesign =  function () { 
		return {     
			// Page root container                    
			"flexFlow":"column nowrap",
			"items":[
				// Upper third of page, contains 4 rows
				{
					"flexFlow":"column nowrap", 
					"background":"dark",
					"border": "none", 
					"padding":"small",
					"items":[
						// Row 1/4 with customer image and name
						{   
							"flexFlow":"row nowrap",
							"alignItems":"center",
							"justifyItems":"center",   
							"labelStyle":"hidden",             
							"items":[
								{
									// Customer image
									"name":"FMCustomer_Image",
									"imageStyle":"circular",
									height:3, 
									width:3
								},
								{
									// Customer name
									name: "FMCustomer_FullName",
									padding: "none"
								}
							]
						},
						// Row 2/4 with vehicle description
						{
							"justifyItems":"center",
							"items":[
								{
									"name":"FMVehicle_FullDescription",
									"labelStyle":"hidden"
								}
							]
						},
						// Row 3/4 with reservation's detail fields
						{
							"flexFlow":"row nowrap",
							"labelStyle":"inline",
							"items":[
								{
									// Column 1
									"flexSize":"1",
									"flexFlow":"column nowrap",
									"alignItems":"flex-start",
									"items":[
										{
											// Status
											"name":"FMRental_State",
											"label":"Status"
										},
										// Start date
										"FMRental_StartDate"                          
									]
								},
								{
									// Column 2
									"flexSize":"1",
									"flexFlow":"column nowrap",
									"alignItems":"flex-end",
									"items":[
										{
											// Rental Id
											"name":"FMRental_RentalId",
											"label":"Id"
										},
										// Dnd date
										"FMRental_EndDate"                   
									]
								}
							]
						},        
						{
							// Row 4/4 with the actions
							"flexFlow":"row nowrap",
							"justifyItems": "space-around",                                    
							"items":
							[
								{
									"type":"Navigation",
									label: "Complete",
									style: "button",
									icon: "checkmark",
									backgroundColor: "positive",
									"navigation":metadataService.navigateTo("Complete-rental"),
								},
								{
									"type":"Navigation",
									label: "Delete",
									style: "button",
									icon: "trash-b",
									backgroundColor: "negative",
									"navigation":metadataService.navigateTo("Delete-reservation"),
								},
								{
									"type":"Navigation",
									label: "Edit",
									style: "button",
									icon: "edit",
									backgroundColor: "neutral",
									"navigation":metadataService.navigateTo("Edit-Reservation"),
								}
							]
						}
					]
				},
				{
					// Middle thrid of page, contains list
					"flexSize":"1",
					"allowScroll": true,
					"items":[
						{
							// List with rental charges
							"name":"FMRentalCharge",
							"alignItems":"stretch",
							"itemBorder": true,
							"design":{                                
								// Override of default list design
								"flexFlow":"row nowrap",
								"justifyItems":"space-between",
								"labelStyle":"hidden", 
								border: "none",
								"items":[
										"FMRentalCharge_ChargeType",
										"FMRentalCharge_PerUnitAmount"
								]
							}
						},
						{
							// Navigation to action for adding charge lines
							"type":"Navigation",
							label: "Add charge",  
							"icon":"plus",
							"navigation":metadataService.navigateTo("Add-charge"),
						}
					]
				},
				{
					// Lower third of page
					"flexFlow":"row nowrap",
					border:"solid",
					labelStyle:"inline",                                
					items:[
						{
							// Total of vehicle rate for reservation period
							name:"FMRental_VehicleRateTotal",
							label:"Vehicle",
							"flexSize":"1"
						},
						{
							// Total of vehicle rate and retal charges
							name:"CalculatedTotal",
							label:"Sub-total",
							"flexSize":"1"
						}
					]                            
				}
					
			]
		};
	};

	// Design for Reservation Management workspace
	var getReservationWorkspaceDesign =  function () { 
		return {
			flexFlow:"column nowrap",
			items: [
				// uppper half, black bg, content height - show tiles to pages
				{
					"flexFlow":"row nowrap",
					"background":"dark",
					"border": "none", 
					"justifyItems": "space-around",                                    
					"items":
					[
						{
							"type":"Navigation",
							label: "Customers",
							style: "button",
							showCount: true,
							"navigation":metadataService.navigateTo("All-Customers"),
						},
						{
							"type":"Navigation",
							label: "Reservations",
							style: "button",
							showCount: true,
							"navigation":metadataService.navigateTo("All-Reservations"),
						},
						{
							"type":"Navigation",
							label: "Vehicles",
							style: "button",
							showCount: true,
							"navigation":metadataService.navigateTo("All-Vehicles"),
						}
					]
				},
				// lowe half - grow or shrink
				{
					"flexSize":"1",
					"allowScroll": true,   
					items: 
					[
						// Part to include all active reservationa
						{
							"type":"Part",
							"contentPage": "Active-reservations",
							design: 
							{
								// page
								"flexFlow":"column nowrap",                                            
								"items":
								[ 
									{
										"name":"RentalsGrid",                                                        
										"flexSize":"1",
										"hideSearchBar": true,
										"itemBorder": true,  
										"padding":"small",                                                      
										"design":
										{
											"flexFlow":"column nowrap",
											"justifyItems": "flex-start",
											"border":"none",
											"items":
											[
												// name and total
												{
													"flexFlow":"row nowrap",
													"flexSize":"0",
													"justifyItems":"space-between",
													"labelStyle":"hidden",
													"items":
													[
														"FMCustomer_FullName",
														"FMRental_VehicleRateTotal"
													]
												},
												// image and vehicle
												{
													"flexFlow":"row nowrap",
													"flexSize":"0",
													"justifyItems":"flex-start",
													"alignItems":"center",
													"labelStyle":"hidden",
													"items":
													[
														{
															"name":"FMCustomer_Image",
															"imageStyle":"circular",
															height:3,
															width:3,
														},
														"FMVehicle_FullDescription"
													] 
												},
												// dates
												{
													"flexFlow":"row nowrap",
													"flexSize":"0",
													"justifyItems":"space-between",
													"labelStyle":"inline",
													"items":
													[
														"FMRental_StartDate",
														"FMRental_EndDate"
													]
												}
											]
										}
									}
								]                   
							}                                 
						}
					],
				},
				// Bottom part fixed - show link to create reservation
				{
					"type":"Navigation",
					icon: "plus",
					label: "Create reservation",
					"navigation":metadataService.navigateTo("Add-Reservation"),
				}
			]
		};
	};

	var configureCustomerFullNameUpdater = function(){
		var newCustomerTaskMetadata = metadataService.findTask("New-customer");
			if(newCustomerTaskMetadata){
				var firstNameControl = metadataService.findControl(newCustomerTaskMetadata, 'FMCustomer_FirstName');
				var lastNameControl = metadataService.findControl(newCustomerTaskMetadata, 'FMCustomer_LastName');
				if (firstNameControl && lastNameControl) {
					dataService.setFieldUpdater(
						newCustomerTaskMetadata,
						'temp-fleet-field-id-1',
						'fullName',
						function (parentData, entityId, reconciledState) {
							if(parentData) {
								var firstName = parentData[firstNameControl.Id];
								var lastName = parentData[lastNameControl.Id];

								if (firstName) {
									if (lastName) {
										return firstName + ' ' + lastName;
									}
									return firstName;
								} else {
									return lastName;
								}
							}  
							return null;                      
						}
					);
				}
			}
	};

	var reservationDetailsLoaded = function (pageDataWrapper) {
		var vin = pageDataWrapper.getControlValue('FMVehicle_VIN');
		var vehicleDes = pageDataWrapper.getControlValue('FMVehicle_FullDescription');
		if (vin) {
			pageDataWrapper.setControlValue('FMVehicle_FullDescription', vehicleDes + "--" + vin);
		}
	};
	
	var newCustomerSubmitted = function (taskDataWrapper) {
		var firstName = taskDataWrapper.getControlValue('FMCustomer_FirstName');
		var lastName = taskDataWrapper.getControlValue('FMCustomer_LastName');

		if (firstName && lastName) {
			taskDataWrapper.setControlValue('FullName', firstName + " " + lastName);
		}
	};

	// Update the visibility of Actions on the Reservation details Page based on the state of the Reservation
	var configureReservationDetails_RentalStatusBehavior = function(context){
		metadataService.configureAction('Delete-reservation', { visible: true });
		metadataService.configureAction('Edit-Reservation', { visible: true });
		metadataService.configureAction('Start-rental', { visible: true });
		metadataService.configureAction('Complete-rental', { visible: true });
		
		if (context.pageContext) {
			var contextParts = context.pageContext.split(':');
			if (contextParts && contextParts.length === 2) {

				var entityType = contextParts[0];
				var entityId = contextParts[1];
				if (entityType && entityId) {
					
					var entityDataWrapper = dataService.getEntityData(entityType, entityId);
					if (entityDataWrapper) {
						
						var rentalStatus = entityDataWrapper.getPropertyValue('State');
						if (rentalStatus === 'Ready for pickup') {
							metadataService.configureAction('Complete-rental', { visible: false });
						}
						else if (rentalStatus === 'In progress') {
							metadataService.configureAction('Start-rental', { visible: false });
						}
						else if (rentalStatus === 'Complete') {
							metadataService.configureAction('Start-rental', { visible: false });
							metadataService.configureAction('Complete-rental', { visible: false });
							metadataService.configureAction('Edit-Reservation', { visible: true });
						}
					}
				}
			}
		}
	};

	// Set the default value on the mileage field, based on the previous mileage
	var configureCompleteRental_MileageBehavior = function(){
		if (context.pageContext) {
			var contextParts = context.pageContext.split(':');
			if (contextParts && contextParts.length === 2) {

				var entityType = contextParts[0];
				var entityId = contextParts[1];
				if (entityType && entityId) {
					
					var entityDataWrapper = dataService.getEntityData(entityType, entityId);
					if (entityDataWrapper) {
						
						var vehicleMileage = entityDataWrapper.getPropertyValue('FMVehicle/Mileage');
						if (vehicleMileage && vehicleMileage.$ref) {
							taskData.setDefaultControlValue('FMRental_EndMileage', parseInt(vehicleMileage.value) + 1);
						}
					}
				}
			}
		}
	};

	return {
        appInit: function (appMetadata) {

			/* Workspace configuration */
			// (Needs v 1.3.0 for compatibility) metadata Service.configureWorkspace({design: getReservationWorkspaceDesign()});	               
			metadataService.hideNavigation('Select-a-customer', 'Select-a-vehicle', 'Customer-rentals', 'Reservation-discounts', 'Discount-details', 'Rental-charges');
			
			/** Page configurations **/
			/* All reservations */
			metadataService.configureControl('All-Active-Reservations', 'FMCustomer_Image', { imageStyle: 'circular' });
			/* Reservation details */
			metadataService.configurePage('Reservation-details', { onDataLoaded: reservationDetailsLoaded });
			// (Needs v 1.3.0 for compatibility) metadataService.configurePage('Reservation-details', {design: getReservationDetailsDesign()});			
			/* All customers */
			metadataService.configureControl('All-Customers', 'FMCustomer_RecId', { hidden: true });
			metadataService.configureControl('All-Customers', 'FMCustomer_Image', { imageStyle: 'circular' });
			/* Customer details */
			metadataService.addLink('Customer-details', 'Customer-rentals', 'cust-rentals-nav-control', 'Rentals', true);
			metadataService.configureControl('Customer-details', 'FMCustomer_Image', { imageStyle: 'circular' });
            /* All vehicles */
			metadataService.configureControl('All-Vehicles', 'FMVehicle_RecId', { hidden: true });

			/** Action configurations **/
			/* Add reservation */
			// (With KB 3216943, these lookups are configrued in static metadata) 
			// metadataService.configureLookup('Add-Reservation', 'FMRental_Customer', { lookupPage: 'All-Customers', valueField: 'FMCustomer_RecId', displayField: 'FMCustomer_FullName', showLookupPage: true });			
			// metadataService.configureLookup('Add-Reservation', 'FMRental_Vehicle', { lookupPage: 'All-Vehicles', valueField: 'FMVehicle_RecId', displayField: 'FMVehicle_FullDescription', showLookupPage: true });
			/* Edit reservation */
			metadataService.configureAction('Edit-Reservation', { sourcePage: 'Reservation-details', isIdempotent: true});
			/* Update customer details */		
			metadataService.configureControl('Update-Customer-Details', 'FMCustomer_CellPhone', { hidden: true });
			metadataService.configureAction('Update-Customer-Details', { sourcePage: 'Customer-details', isIdempotent: true});
			/* Update customer photo */			
			metadataService.configureControl('Update-picture', 'FMCustomer_UploadPhoto', { boundField: 'Image' });
			/* Update customer license image */
			metadataService.configureControl('Update-license-picture', 'FMCustomer_UploadLicense', { boundField: 'LicenseImage' });
			/* New customer */
			configureCustomerFullNameUpdater();
			metadataService.configureAction('New-customer', { onSubmit: newCustomerSubmitted });
			metadataService.configureControl('New-customer', 'FMAddressTable_AddressLine2Copy2', { hidden: true });
        },
		pageInit: function (pageMetadata, context) {

			/** Page state-based configurations **/
			/* Reservation details */
			if (pageMetadata.Name === 'Reservation-details') {
				configureReservationDetails_RentalStatusBehavior(context);
			}
		},
		taskInit: function (taskMetadata, context, taskData) {
			if (taskMetadata.Name === 'Add-Reservation') {
				taskData.setDefaultControlValue('FMRental_StartDate', new Date());
			}
			else if (taskMetadata.Name === 'Complete-rental') {
				configureCompleteRental_MileageBehavior(context, taskData);				
			}
		}
    }
}
