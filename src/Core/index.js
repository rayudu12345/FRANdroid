export function datePickerValidation(date){

  d1    = new Date();
  d2    = new Date(date);
  diff  = new Date(
      d1.getFullYear()-d2.getFullYear(),
      d1.getMonth()-d2.getMonth(),
      d1.getDate()-d2.getDate()
  );

  year_diff         = diff.getYear();
  month_diff        = diff.getMonth();
  var return_array  = [];
  var reult = ''
  if(year_diff>=0 ){
     result = {'years':year_diff, 'month':month_diff, 'flag':true};
    return_array.push(result);

  }else if(year_diff==12 && month_diff>11){

     result = {'years':year_diff, 'month':month_diff, 'flag':true};
    return_array.push(result);
  }
  else{
     result = {'years':year_diff, 'month':month_diff, 'flag':false};
    return_array.push(result);
  }

  return return_array;
}
