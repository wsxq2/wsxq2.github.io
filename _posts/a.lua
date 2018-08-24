 function var_minmax(a,b,...)
      local min,max,temp,arg
      arg={...}
	  min=a>b and b or a
	  max=a<b and b or a
      for i=1,#arg do
         temp=arg[i]
         min=min>temp and temp or min
         max=max<temp and temp or max
      end
      return min,max
  end

