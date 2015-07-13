(function(){
var main=angular.module('main',[]);

/*
main.controller('addMonth',function($scope){
			$scope.startDate=new Date(2015,4,24);
			alert($scope.startDate.toString());
			$scope.hrs=[];
			var count=0; 
//alert($scope.startDate.getMinutes());
			$scope.addHrs=function(){
									while(count<24)
											{
											$scope.hrs.push(count);count++;
												}
										};
								});
								
								
*/
          
               

main.controller('dataCtrl', function($scope, $http) {
//scope Vsriables declaration

$scope.names=[];
$scope.date = new Date(2015, 4, 24,0,0,0);
$http.get("sample-data.json")
	.success(function (response) { $scope.names = response.records; });
$scope.hour=[];
		(function(){
						var count=0;	
						var p=new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate(),0,0,0);
						count=p.getHours();
							while(count<=23 )
									{
											p=new Date(p.getFullYear(),p.getMonth(),p.getDate(),count,0,0);
											$scope.hour.push(p);
										//alert(p.getHours());
											count++;
									}
					})();

 
//				 var x = event.which || event.keyCode;
   
                $scope.key = function($event) {
                   val=(window.event ? $event.keyCode : $event.which);
				   if(val===39)
				   {
				   $scope.invoker(2);
				   }
				   if(val===37)
				   {
				   $scope.invoker(1);
				   }
                }
          

//$scope.get=function(){for(val in $scope.names){       }      }
//invoker functions to access all other functions private to the controller
$scope.invoker=function(val){
				regular(val);
				reset();
				display();
				addChild();
						};
 
var regular=function(val){ 
		var counter=0;
			if(val===2)
				 $scope.date=new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()+1,0,0,0);
			else
				$scope.date=new Date($scope.date.getFullYear(),$scope.date.getMonth(),$scope.date.getDate()-1,0,0,0);	
						
						
						
						};
						
		var reset=function(){var myNode = document.getElementById("creator");
									while (myNode.firstChild) {
									myNode.removeChild(myNode.firstChild);
						}};				
						
		var display=function(){	
							$scope.events=[{start:[],end:[],title:[]}];
							count=0;
					//Events matched to the corresponding date
								c=0;
		
						while(count<$scope.names.length)
											{ 
												var start=new Date($scope.names[count].startTime);
												var end=new Date($scope.names[count].endTime);
												var title=$scope.names[count].title;
		
											if(start.getDate()===$scope.date.getDate () &&start.getMonth()===$scope.date.getMonth()&&start.getFullYear()===$scope.date.getFullYear())
																{
						//alert(start.getHours()+":"+start.getMinutes());
																	$scope.events[0].start.push(start);
																	$scope.events[0].end.push(end);
																	$scope.events[0].title.push(title);
																}
												count++;
											}
								};
		
		var addChild=function(){
								var val=1;
		

								function format(date) {
														var hrs = date.getHours();
														var min = date.getMinutes();
														var ampm = hrs >= 12 ? 'pm' : 'am';
															hrs = hrs % 12;
															hrs = hrs ? hrs : 12; // the hour '0' should be '12'
															min = min < 10 ? '0'+min : min;
														var strTime = hrs + ':' + min + ' ' + ampm;
														return strTime;
														}


								for(var i=0;i<$scope.hour.length;i++)
															{
																var node = document.createElement("DIV");
																document.getElementById("creator").appendChild(node);
																node.setAttribute("id",$scope.hour[i].getHours());
																node.setAttribute("class","col-sm-3");
																//alert('aca');
																for(var j=0;j<$scope.events[0].start.length;j++)
																			{
																			if($scope.events[0].start[j].getHours()===$scope.hour[i].getHours())
																					{
																					var child = document.createElement("DIV");     
																					//	var anchor = document.createElement("button");     
																					var br= document.createElement("BR");
																					var br2= document.createElement("BR");			
																					var textnode = document.createTextNode($scope.events[0].title[j]);         
				 
																					child.appendChild(textnode);
																					child.appendChild(br);
																					if((($scope.events[0].end[j]-$scope.events[0].start[j])/60000)<20)
																						{
																							child.removeChild(br);
																							child.appendChild(document.createTextNode("\u00A0 \u00A0") );
																						}
					
																				child.appendChild(document.createTextNode(format($scope.events[0].start[j])+"-"+ format($scope.events[0].end[j]) ));
																				child.appendChild(br2);
					
					//anchor.setAttribute("class","btn");
						
				
					//child.appendChild(anchor);					
					
					//child.appendChild(btn1); node.appendChild(btn2);		
					
																				child.setAttribute("class","canvas");
				//alert(val);
																				if(val%2===0)
																					{
																					child.style.backgroundColor = "#D6EBFF";
																					child.style.color="#3D7A99";
																					val++;
																					}
																				else
																					{
					//alert('ad');
																					child.style.backgroundColor = "	#3D7A99";
																					child.style.color="#D6EBFF";
																					val++;
																					}
					
				
					
																					end=$scope.events[0].end[j];
																					start=$scope.events[0].start[j];
					
																				if($scope.events[0].start[j].getMinutes()>0)
																						child.style.marginTop=$scope.events[0].start[j].getMinutes()+17;
																				child.style.height=($scope.events[0].end[j]-$scope.events[0].start[j])*1.5/60000;
																				document.getElementById($scope.events[0].start[j].getHours()).appendChild(child);
																			}	
					
																		}
			
																	}

							};		
  
  
													});
})();