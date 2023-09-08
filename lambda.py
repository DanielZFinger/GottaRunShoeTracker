import json
import boto3
import uuid

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('OrderTable')
brandTable = dynamodb_client.Table('BrandTable')
modelTable = dynamodb_client.Table('ModelTable')
userTable = dynamodb_client.Table('UserTable')
colorTable = dynamodb_client.Table('ColorTable')

def lambda_handler(event, context):
    print(json.dumps(event))
    body = json.loads(event['body'])
    operation = body['operation']
    # operation = event['operation']
    
    # *****|All Color Functions|*****
    if operation == 'retrieveColors':
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = colorTable.scan(
            )
            
            colors = response.get('Items', [])
            if colors:
                mResponse = "Color info succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(colors)
                }
                return response
            else:
                mResponse = "Color info failed to retrieve!"
                response = {
                    "statusCode": 403,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "User info couldn't be reached!"
            response = {
                "statusCode": 402,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    elif operation == 'createColor':
        brand = body['Brand']
        color = body['Color']
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            messageResponse = colorTable.put_item(
                Item={
                    'Color': color,
                    'BrandName': brand
                }
            )
            mResponse = "Color succesfully added!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
        except Exception as e:
            mResponse = "Color failed to be added!"
            response = {
                "statusCode": 408,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    
    # *****|All User Functions|*****  
    if operation == 'retrieveUserInfo':
        userID = body['UserID']
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = userTable.scan(
                FilterExpression='UserID = :cid',
                ExpressionAttributeValues={':cid': userID}
            )
            
            models = response.get('Items', [])
            if models:
                mResponse = "User info succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(models)
                }
                return response
            else:
                mResponse = "User info failed to retrieve!"
                response = {
                    "statusCode": 403,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "User info couldn't be reached!"
            response = {
                "statusCode": 402,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    elif operation == 'retrieveAllCustomers':
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = userTable.scan(
            )
            
            models = response.get('Items', [])
            if models:
                mResponse = "Customer info succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(models)
                }
                return response
            else:
                mResponse = "Customer info failed to retrieve!"
                response = {
                    "statusCode": 403,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "User info couldn't be reached!"
            response = {
                "statusCode": 402,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    
    # *****|All Model Functions|*****
    if operation == 'createModel':
        brand = body['Brand']
        model = body['Model']
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            messageResponse = modelTable.put_item(
                Item={
                    'Model': model,
                    'Brand': brand
                }
            )
            mResponse = "Model succesfully added!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
        except Exception as e:
            mResponse = "Model failed to be added!"
            response = {
                "statusCode": 408,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    elif operation == 'retrieveModels':
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = modelTable.scan(
            )
            
            models = response.get('Items', [])
            if models:
                mResponse = "Models succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(models)
                }
                return response
            else:
                mResponse = "Models failed to retrieve!"
                response = {
                    "statusCode": 403,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "Model failed to update!"
            response = {
                "statusCode": 402,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    
    # *****|All Brand Functions|*****
    if operation == 'createBrand':
        brand = body['Brand']
        # brand = event['Brand']
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            messageResponse = brandTable.put_item(
                Item={
                    'BrandName': brand
                }
            )
            mResponse = "Brand succesfully added!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
        except Exception as e:
            mResponse = "Brand failed to be added!"
            response = {
                "statusCode": 407,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
            
    elif operation == 'retrieveBrand':
        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = brandTable.scan(
            )
            
            brands = response.get('Items', [])
            if brands:
                mResponse = "Brands succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(brands)
                }
                return response
            else:
                mResponse = "Brands failed to retrieve!"
                response = {
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "Brand failed to update!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
        
    
    
    # *****|All Order Functions|*****
        
    # update a specific orders contents based on its orderID
    if operation == 'updateOrder':
        OrderID = body['orderID']
        brand = body['brand']
        model = body['model']
        color = body['color']
        size = body['size']
        width = body['width']
        gender = body['gender']
        status = body['status']
        completedDate= body['completedDate']
        
        try:
            # Update the item in DynamoDB
            response = table.update_item(
                Key={'OrderID': OrderID},
                UpdateExpression='SET #brandAttr = :brandValue, #modelAttr = :modelValue, #colorAttr = :colorValue, '
                                 '#sizeAttr = :sizeValue, #widthAttr = :widthValue, #genderAttr = :genderValue, '
                                 '#statusAttr = :statusValue, #completedDateAttr = :completedDateValue',
                ExpressionAttributeNames={
                    '#brandAttr': 'Brand',
                    '#modelAttr': 'Model',
                    '#colorAttr': 'Color',
                    '#sizeAttr': 'Size',
                    '#widthAttr': 'Width',
                    '#genderAttr': 'Gender',
                    '#statusAttr': 'Status',
                    '#completedDateAttr': 'CompletedDate'
                },
                ExpressionAttributeValues={
                    ':brandValue': brand,
                    ':modelValue': model,
                    ':colorValue': color,
                    ':sizeValue': size,
                    ':widthValue': width,
                    ':genderValue': gender,
                    ':statusValue': status,
                    ':completedDateValue': completedDate
                }
            )
    
            mResponse = "Order updated successfully!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response
    
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 406,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response
    
    elif operation == 'updateOrderStatus':
        OrderID = body['OrderID']
        status = body['status']
        
        try:
            # Update the 'Status' attribute using the UpdateExpression
            messageResponse = table.update_item(
                Key={'OrderID': OrderID},
                UpdateExpression='SET #statusAttr = :newStatus',
                ExpressionAttributeNames={'#statusAttr': 'Status'},
                ExpressionAttributeValues={':newStatus': status}
            )
            mResponse = "Order updated successfully!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 409,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response

    elif operation == 'updateOrderStatusComplete':
        OrderID = body['OrderID']
        status = body['status']
        CompletedDate = body['CompletedDate']
        
        try:
            # Update the 'Status' and 'CompletedDate'
            messageResponse = table.update_item(
                Key={'OrderID': OrderID},
                UpdateExpression='SET #statusAttr = :newStatus, CompletedDate = :newCompletedDate',
                ExpressionAttributeNames={'#statusAttr': 'Status'},
                ExpressionAttributeValues={':newStatus': status, ':newCompletedDate': CompletedDate}
            )
            mResponse = "Order updated successfully!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 409,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body": json.dumps(mResponse)
            }
            return response



    
    # create an order
    elif operation == 'create':
        # Extract order details from the event
        # add new order params here when wishing to expan table variables
        employee_id = body['EmployeeID']
        customer_id = body['CustomerID']
        brand = body['Brand']
        model = body['Model']
        size = body['Size']
        width = body['Width']
        color = body['Color']
        status = body['Status']
        orderedDate = body['OrderedDate']
        completedDate = body['CompletedDate']
        gender = body['Gender']
        name = body['Name']
        email = body['Email']
        
        # Create a new order in the table
        try:
            # creates random UUID for Order ID
            order_id = str(uuid.uuid4())
            
            messageResponse = table.put_item(
                Item={
                    'OrderID': order_id,
                    'EmployeeID': employee_id,
                    'CustomerID': customer_id,
                    'Brand': brand,
                    'Model': model,
                    'Size': size,
                    'Width': width,
                    'Color': color,
                    'Status': status,
                    'OrderedDate': orderedDate,
                    'CompletedDate': completedDate,
                    'Gender': gender,
                    'Name': name,
                    'Email': email
                }
            )
            mResponse = "Succesfully created order!"
            response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)}
            return response
        except Exception as e:
            mResponse = "Order failed to create!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
    
    # retrieve info regarding a specific order
    elif operation == 'retrieveMyOrders':
        customer_id = body['CustomerID']

        try:
            # response = table.get_item(Key={'CustomerID': customer_id})
            # order = response.get('Item')
            response = table.scan(
                FilterExpression='CustomerID = :cid',
                ExpressionAttributeValues={':cid': customer_id}
            )
            
            order = response.get('Items', [])
            print(order)
            if order:
                print("yayayayya")
                mResponse = "Order succesfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(order)
                }
                return response
            else:
                mResponse = "Order failed to retrieve!"
                response = {
                    "statusCode": 400,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response
            
    elif operation == 'retrieveAll':

        try:
            # Initial scan
            response = table.scan()
            # items.extend(response.get('Items', []))
            # order = response.get('Items', [])
            items = response.get('Items',[])
    
            print(items)
            if items:
                mResponse = "Orders successfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    "body": json.dumps(items)
                }
                return response
            else:
                mResponse = "Order failed to retrieve!"
                response = {
                    "statusCode": 411,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response    
                
        except Exception as e:
            mResponse = "Order failed to update!"
            response = {
                "statusCode": 412,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response   
    
    elif operation == 'retrieveActiveOrders':
        completedDate = body['completedDate']
        try:
            # Initial scan
            response = table.scan(FilterExpression='CompletedDate = :cid',
                ExpressionAttributeValues={':cid': completedDate}
                )
            items = response.get('Items',[])
    
            print(items)
            if items:
                mResponse = "Orders successfully retrieved!"
                response = {
                    "statusCode": 200,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    "body": json.dumps(items)
                }
                return response
            else:
                mResponse = "Order failed to retrieve!"
                response = {
                    "statusCode": 411,
                    "headers": {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                "body": json.dumps(mResponse)
                }
                return response 
        except Exception as e:
            mResponse = "Order failed to retrieve!"
            response = {
                "statusCode": 412,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            "body": json.dumps(mResponse)
            }
            return response   
    
    else:
        mResponse = "Invalid operation!"
        response = {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        "body": json.dumps(mResponse)
        }
        return response

