-- Task 1: Insert Tony Stark into account table
INSERT INTO public.account (
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password
)
VALUES (
    'Tony', 
    'Stark', 
    'tony@starkent.com', 
    'Iam1ronM@n'
);

-- Task 2: Update Tony Stark account_type to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- Task 3: Delete Tony Stark from account table
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- Task 4: Update GM Hummer description to replace "small interiors" with "a huge interior"
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Task 5: Select make, model, and classification for Sport category
SELECT 
    i.inv_make, 
    i.inv_model, 
    c.classification_name
FROM public.inventory i
INNER JOIN public.classification c 
    ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Task 6: Update all inventory records to add "/vehicles" to image paths
UPDATE public.inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');