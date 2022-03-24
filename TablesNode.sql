


CREATE TABLE BRAND
( 
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(30)
);

CREATE TABLE TYPE
( 
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(30)
);

CREATE TABLE DEVICE
( 
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(256),
	PRICE MONEY,
	RATING FLOAT,
	IMAGE VARCHAR(256),
	TYPE_ID INTEGER,
	BRAND_ID INTEGER,

	FOREIGN KEY(TYPE_ID) REFERENCES TYPE(ID),
	FOREIGN KEY(BRAND_ID) REFERENCES BRAND(ID)
);

CREATE TABLE DEVICE_INFO
( 
	ID SERIAL PRIMARY KEY,
	DEVICE_ID INTEGER,
	TITLE VARCHAR(30),
	DESCRIPTION VARCHAR(256),
	
	FOREIGN KEY(DEVICE_ID) REFERENCES DEVICE(ID)

);

CREATE TABLE BASKET
( 
	ID SERIAL PRIMARY KEY,
	USER_ID INTEGER,
	
	FOREIGN KEY(USER_ID) REFERENCES USER(ID)
);

CREATE TABLE BASKET_DEVICE
( 
	ID SERIAL PRIMARY KEY,
	DEVICE_ID INTEGER,
	BASCKET_ID INTEGER,
	
	FOREIGN KEY(DEVICE_ID) REFERENCES DEVICE(ID),
	FOREIGN KEY(BASCKET_ID) REFERENCES BASKET(ID)

);


CREATE TABLE "USER"
( 
	ID SERIAL PRIMARY KEY,
	LOGIN VARCHAR(30) unique,
 	EMAIL VARCHAR(256) unique,
	PASSWORD VARCHAR(256),
	ROLE VARCHAR(30)
	
);

CREATE TABLE RATING
( 
	ID SERIAL PRIMARY KEY,
	USER_ID INTEGER,
	DEVICE_ID INTEGER,
	RATE INTEGER,
	
	FOREIGN KEY(USER_ID) REFERENCES USER(ID),
	FOREIGN KEY(DEVICE_ID) REFERENCES DEVICE(ID),

);
