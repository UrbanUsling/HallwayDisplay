package com.example.demo.exception;

public class LampException extends RuntimeException{

        public LampException(String message) {
            super(message);
        }
        public LampException(String message, Throwable cause) {
            super(message, cause);
        }
}
