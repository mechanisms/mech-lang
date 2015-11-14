# Kevin Albert | kaalbert@ucsc.edu
# Eric Hosick  | erichosick@gmail.com

INC_DIR	:= include/
SRC_DIR	:= src/
BLD_DIR	:= build/
BIN_DIR := bin/

CC		:= g++
CFLAGS	:= -Ofast -c -std=c++11 -Wextra -Wall
LDFLAGS	:= -std=c++11 -Wextra -Wall
SRC		:= test.cpp mech-parser.cpp parse_context.cpp ast.cpp
SRCS_DR := $(addprefix $(SRC_DIR)/,$(SRC))
HEADERS	:= mech-parser.h
OBJ		:= $(SRC:.cpp=.o)
OBJ_DR  := $(addprefix $(BLD_DIR), $(OBJ))
GENSRC	:= mech-grammar.cpp mech-scanner.cpp
GENOBJ	:= $(GENSRC:.cpp=.o)
GENO_DR := $(addprefix $(BLD_DIR), $(GENOBJ))
EXE		:= $(BIN_DIR)mech

vpath %.h   ${INC_DIR}
vpath %.cpp ${SRC_DIR}
vpath %.o   ${BLD_DIR}

$(EXE): $(OBJ) $(GENOBJ)
	$(CC) -I $(INC_DIR) -I $(SRC_DIR) -I . -I $(BLD_DIR) $(LDFLAGS) $(GENO_DR) $(OBJ_DR) -o $(EXE)

$(OBJ): %.o: %.cpp $(GENSRC) 
	$(CC) -I $(INC_DIR) -I $(SRC_DIR) -I . -I $(BLD_DIR) $(CFLAGS) $< -o $(BLD_DIR)$@ 

$(GENOBJ): %.o: %.cpp mech-grammar.h 
	$(CC) -I $(INC_DIR) -I $(SRC_DIR) -I . -I $(BLD_DIR) -c -std=gnu++11 $(BLD_DIR)$< -o $(BLD_DIR)$@

mech-scanner.cpp: scanner.cpp.messy
	sed 's|register ||' <$(BLD_DIR)scanner.cpp.messy >$(BLD_DIR)mech-scanner.cpp

scanner.cpp.messy: mech-scanner.l mech-grammar.h mech-parser.h
	flex --outfile=$(BLD_DIR)$@ $< 2>/dev/null

# Makefile.deps: mech-grammar.h
# 	g++ -I $(INC_DIR) -I $(SRC_DIR) -I. -MM $(SRCS_DR) >$@

mech-grammar.h: mech-grammar.cpp

mech-grammar.cpp: mech-grammar.y mech-parser.h
	bison --defines=$(BLD_DIR)mech-grammar.h --output=$(BLD_DIR)$@ $<

# include Makefile.deps

clean:
	rm -f $(EXE) $(BLD_DIR)*.o 
#   Makefile.deps
