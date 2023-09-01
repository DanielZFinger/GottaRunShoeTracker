import json
import boto3
import uuid

dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table('OrderTable')
brandTable = dynamodb_client.Table('BrandTable')
modelTable = dynamodb_client.Table('ModelTable')

def lambda_handler(event, context):
    print(json.dumps(event))
    body = json.loads(event['body'])
    operation = body['operation']
    # operation = event['operation']
    
    # *****|All Model Functions|*****
    if operation == 'retrieveModels':
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
    if operation == 'retrieveBrand':
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
    if operation == 'update':
        employee_id = body['EmployeeID']
        
        try:
            messageResponse = table.update_item(
                Key={'OrderID': order_id, 'EmployeeID': employee_id},
                UpdateExpression='SET CustomerID = :cid',
                ExpressionAttributeValues={':cid': customer_id}
            )
            mResponse = "Order updated succesfully!"
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
    
    # create an order
    elif operation == 'create':
        # Extract order details from the event
        # add new order params here when wishing to expan table variables
        employee_id = body['EmployeeID']
        customer_id = body['CustomerID']
        brand = body['Brand']
        model = body['Model']
        
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
    elif operation == 'retrieveAll':
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

