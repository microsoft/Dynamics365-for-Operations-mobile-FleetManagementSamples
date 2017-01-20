function main(metadataService, dataService, cacheService, $q) {
	// Design for Reservation details page
	var getReservationDetailsDesign =  function () { 
		return {                         
			"flexFlow":"column nowrap",
			"items":[
				// uppper half, black bg
				{
					"flexFlow":"column nowrap", 
					"background":"dark",
					"border": "none", 
					"padding":"small",
					"items":
					[
						// row with customer image and name
						{   
							"flexFlow":"row nowrap",
							"alignItems":"center",
							"justifyItems":"center",   
							"labelStyle":"hidden",             
							"items":
							[
								// customer image
								{
									"name":"FMCustomer_Image",
									"imageStyle":"circular",
									height:3, // control specific property
									width:3,  // control specific property
								},
								// customer name
								{
									name: "FMCustomer_FullName",
									padding: "none",
								}
							]
						},
						// row with rental id
						{
							"justifyItems":"center",
							"items":[
								{
									"name":"FMVehicle_FullDescription",
									"labelStyle":"hidden",
								}
							]
						},
						// row with header's detail fields
						{
							"flexFlow":"row nowrap", // could become single column if not enough space on single line/row
							"justifyItems":"space-between",
							"labelStyle":"inline", // inline, stacked or hidden           
							"items":
							[
								// detail column 1
								{
									"flexSize":"1",
									"flexFlow":"column nowrap",
									"alignItems":"flex-start",
									"items":
									[
										// status
										{
											"name":"FMRental_Status",
											"label":"Status"
										},
										// start date
										"FMRental_StartDate"                          
									]
								},
								// detail column 2
								{
									"flexSize":"1",
									"flexFlow":"column nowrap",
									"alignItems":"flex-end",
									"items":
									[
										// vehicle
										{
											"name":"FMRental_RentalId",
											"label":"Id"
										},
										// end date
										"FMRental_EndDate"                   
									]
								}
							]
						},        
						// row with actions                            
						{
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
				// lines list area
				{
					"flexSize":"1",
					"allowScroll": true,
					"items": 
					[
						{
							"name":"FMRentalCharge",
							"flexFlow":"column nowrap",      
							"alignItems":"stretch",
							"itemBorder": true,
							"design":                        
							{                                
								"flexFlow":"row nowrap",
								"justifyItems":"space-between",
								"labelStyle":"hidden", 
								border: "none",
								"items":
								[
									{
										name: "FMRentalCharge_ChargeType",
									},
									{
										name: "FMRentalCharge_PerUnitAmount",
									}
								]
							}
						},
						{
							"type":"Navigation",
							label: "Add charge",  
							"icon":"plus",
							"navigation":metadataService.navigateTo("Add-charge"),
						}
					]
				},
				// totals row
				{
					"flexFlow":"row nowrap",                                
					items:
					[
						{
							name: "FMRental_VehicleRateTotal",
							label:"Vehicle",
							labelStyle:"inline",
							"flexSize":"1"
						},
						{
							name: "CalculatedTotal",
							label:"Sub-total",
							labelStyle:"inline",
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

	return {
        appInit: function (appMetadata) {
			metadataService.configureWorkspace({design: getReservationWorkspaceDesign()});			               
            
			metadataService.configurePage('Reservation-details', {design: getReservationDetailsDesign()}); 
			
			metadataService.hideNavigation('Select-a-customer', 'Select-a-vehicle', 'Customer-rentals', 'Reservation-discounts', 'Discount-details', 'Rental-charges');
            
			metadataService.addLink('Customer-details', 'Customer-rentals', 'cust-rentals-nav-control', 'Rentals', true);

			metadataService.configureControl('All-Customers', 'FMCustomer_RecId', { hidden: true });
			metadataService.configureControl('All-Vehicles', 'FMVehicle_RecId', { hidden: true });

			metadataService.configureControl('Update-Customer-Details', 'FMCustomer_CellPhone', { hidden: true });

			metadataService.configureLookup('Add-Reservation', 'FMRental_Customer', { lookupPage: 'All-Customers', valueField: 'FMCustomer_RecId', displayField: 'FMCustomer_FullName', showLookupPage: true });			
			metadataService.configureLookup('Add-Reservation', 'FMRental_Vehicle', { lookupPage: 'All-Vehicles', valueField: 'FMVehicle_RecId', displayField: 'FMVehicle_FullDescription', showLookupPage: true });
			
			metadataService.configureAction('Edit-Reservation', { sourcePage: 'Reservation-details', isIdempotent: true});
			metadataService.configureAction('Update-Customer-Details', { sourcePage: 'Customer-details', isIdempotent: true});
			
			metadataService.configureControl('All-Customers', 'FMCustomer_Image', { imageStyle: 'circular' });
			metadataService.configureControl('Customer-details', 'FMCustomer_Image', { imageStyle: 'circular' });
			metadataService.configureControl('All-Active-Reservations', 'FMCustomer_Image', { imageStyle: 'circular' });
			
			metadataService.configureControl('Update-picture', 'FMCustomer_UploadPhoto', { boundField: 'Image' });
			metadataService.configureControl('Update-license-picture', 'FMCustomer_UploadLicense', { boundField: 'LicenseImage' });

			var newCustomerTaskMetadata = metadataService.findTask("New-customer");
			if(newCustomerTaskMetadata){
				var firstNameControl = metadataService.findControl(newCustomerTaskMetadata, 'FMCustomer_FirstName');
				var lastNameControl = metadataService.findControl(newCustomerTaskMetadata, 'FMCustomer_LastName');
			}
			
        },
		pageInit: function (pageMetadata, context) {
			if (pageMetadata.Name === 'Reservation-details') {
				
				var pageEvaluatorFunction = function (pageDataWrapper) {
					var vin = pageDataWrapper.getControlValue('FMVehicle_VIN');
					var vehicleDes = pageDataWrapper.getControlValue('FMVehicle_FullDescription');
					if (vin) {
						pageDataWrapper.setControlValue('FMVehicle_FullDescription', vehicleDes + "--" + vin);
					}
				}
				metadataService.configurePage('Reservation-details', { onDataLoaded: pageEvaluatorFunction });

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
								
								var rentalStatus = entityDataWrapper.getPropertyValue('RentalStatus');
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
			}
		},
		taskInit: function (taskMetadata, context, taskData) {
			if (taskMetadata.Name === 'Add-Reservation') {
				taskData.setDefaultControlValue('FMRental_StartDate', new Date());
			}
			else if (taskMetadata.Name === 'Complete-rental') {
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
			}
		},
    }
}
