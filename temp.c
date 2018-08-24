#include <stdio.h>
int main(int argc, char * argv[]) {
    int i;
    extern char ** environ;
    printf("environment parameters: \n");
    for(i=0; environ[i]!=(char *)0; i++){
        printf("%s\n", environ[i]);
    }
    return 0;
}
