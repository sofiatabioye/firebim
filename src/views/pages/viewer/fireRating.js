


export const calculateFireRating = (type, height)  => {
   let rating;
   let sprinkler;
   let dssDisplay;
   let description;
   let sprinklerText;
   let exposureMethod;
   height = Number(height);
   switch(true) {
      case(type === 'Walls' && height <=5):
            rating = 30;
            sprinkler= 'No';
            dssDisplay= 'REI 30';
            description = '';
            sprinklerText = '';
            exposureMethod = 'Exposed faces';
            return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod};
       case(type === 'compartmentWalls' && height <=5):
           rating = 30;
           sprinkler= 'No';
           dssDisplay= 'REI 30';
           description = '';
           sprinklerText = '';
           exposureMethod = 'Each side separately';
           return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod};

       case (type=== 'Floors' && height <= 5):
           rating = 30;
           sprinkler= 'No';
           dssDisplay= 'REI 30';
           description = 'The approved document B requires that the surface lining of an internal wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is less than 4m2 and B-s3, d2 for an escape route';
           sprinklerText = '';
           exposureMethod = 'From the underside';
           return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod};
       case (type === 'Walls' && height > 5 && height<=11):
           rating = 60;
           sprinkler= 'No';
           dssDisplay= 'REI 60';
           description = `The Approved Document B1 requires that this wall must have a fire rating of 60 mins because the height of the top floor is up to 11m.\n \n 
                         Note: The surface lining of wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is 4m2`;
           sprinklerText = '';
           exposureMethod = 'Exposed faces';
           return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod}
        
       case (type === 'Floors' && height > 5 && height<=11):
           rating = 60;
           sprinkler= 'No';
           dssDisplay= 'REI 60';
           description = `The Approved Document B1 requires that this wall must have a fire rating of 60 mins because the height of the top floor is up to 11m.\n \n 
                         Note: The surface lining of wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is 4m2`;
           sprinklerText = '';
           exposureMethod = 'From the underside';
           return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod}

        case (type === 'compartmentWalls' && height > 5 && height<=11):
            rating = 60;
            sprinkler= 'No';
            dssDisplay= 'REI 60';
            description = `The Approved Document B1 requires that this wall must have a fire rating of 60 mins because the height of the top floor is up to 11m.\n \n 
                          Note: The surface lining of an internal wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is less than 4m2 and B-s3, d2 for an escape route`;
            sprinklerText = '';
            exposureMethod = 'Each side separately';
            return {rating, sprinkler, dssDisplay, description, sprinklerText, exposureMethod}
       
       case (height > 11 && height<=18):
           rating = 60;
           sprinkler= 'Yes';
           dssDisplay= 'E 60 S';
           description = 'The Approved Document B1 requires that this wall must have a fire rating of 60 mins + sprinkler because the height of the top floor is up to 18m. \n \n Note: The surface lining of wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is 4m2';
           sprinklerText = 'The Approved Document B3 requires that this floor must be fitted with a sprinkler because the top floor height is more than 11m above ground level.\n \n Note: sprinkler should not be provided in the common area such as Stairs, corridors or landing';
           return {rating, sprinkler, dssDisplay, description, sprinklerText}
       case (height > 18 && height<=30):
           rating = 90;
           sprinkler= 'Yes';
           dssDisplay= 'E 90 S';
           description = 'The Approved Document B1 requires that this wall must have a fire rating of 90mins + sprinkler because the height of the top floor is up to 30m \n \n Note: Since the height of the Top floor is more than 18m any insulation product, filler materials such as the core materials of metal composite panels, sandwich panels and window spandrel panels but not including gaskets, sealants used in the construction of an external wall should be class A2-s1, d0 or better. \n \n Note: The surface lining of wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is 4m2.';
           sprinklerText = 'The Approved Document B3 requires that this floor must be fitted with a sprinkler because the top floor height is more than 11m above ground level. \n \n Note: sprinkler should not be provided in the common area such as Stairs, corridors or landing';
           return {rating, sprinkler, dssDisplay, description, sprinklerText}
       case (height > 30):
           rating = 120;
           sprinkler= 'Yes';
           dssDisplay= 'E 120 S';
           description = 'The Approved Document B1 requires that this wall must have a fire rating of 120 mins + sprinkler because the height of the top floor is above 30m. \n \n Note: since the height is more than 18m any insulation product, filler materials such as the core materials of metal composite panels, sandwich panels and window spandrel panels but not including gaskets, sealants used in the construction of an external wall should be class A2-s1, d0 or better. \n \n Note: The surface lining of wall and ceiling should meet a classification of C-s3, d2 if the room is more than 4m2 and should meet a classification of D-s3, d2 if the room is 4m2';
           sprinklerText = 'The Approved Document B3 requires that this floor must be fitted with a sprinkler because the top floor height is more than 11m above ground level. \n \n Note: sprinkler should not be provided in the common area such as Stairs, corridors or landing';
           return {rating, sprinkler, dssDisplay, description, sprinklerText}
        default:
           rating = 'N/A';
           sprinkler = 'N/A';
           dssDisplay = 'N/A';
           description = 'N/A';
           sprinklerText = 'N/A';
           return {rating, sprinkler, dssDisplay, description, sprinklerText}
   }

}
