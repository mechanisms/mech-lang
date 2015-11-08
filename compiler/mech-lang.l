%{
#include <cstdio>
#include <iostream>
using namespace std;
#define YY_DECL extern "C" int yylex()

#include "mech-lang.tab.h"  // to get the token types that we return
%}
%option 8bit
%option nodefault
%option nounput
%option noyywrap
%option warn
%option outfile="tmp/lex.yy.c"
%%
[ \t\n]           { ; }
[0-9]+\.[0-9]+    { yylval.fval = atof(yytext); return FLOAT; }
[0-9]+            { yylval.ival = atoi(yytext); return INT; }
[^0-9{}()`:\n ]+  {
					// we have to copy because we can't rely on yytext not changing underneath us:
					yylval.sval = strdup(yytext);
					return STRING;
				  }
.                 { ; }
%%

// %option debug
// %option verbose
